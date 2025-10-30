import { Request, Response } from "express";
const knex = require('../knex/connection');


module.exports = {
    //Para pegar todos as perguntas
    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('questions')

        return res.json(result)

    },

    //Para pegar as perguntas de um topico
    async questionsOfAnTopic(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { topicId } = req.params
        console.log(topicId)

        const result = await knex('questions').where({ topic_id: topicId })

        return res.json(result).status(200)

    },

    async oneQuestion(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { questionId } = req.params

        const result = await knex('questions').where({ id: questionId })
        console.log('question retornada: ', result)
        return res.json(result)

    },

    //Para criar todos as perguntas
    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { id, title, status, value, active, comment, created_at, updated_at, topic_id, deleted_at } = req.body
            const { topicId } = req.params
            await knex('questions').insert({
                id,
                title,
                status,
                value,
                active,
                comment,
                deleted_at,
                created_at: created_at,
                updated_at: updated_at,
                topic_id: topic_id,
            })

            const question = {
                id,
                title,
                status,
                value,
                active,
                comment,
                created_at,
                updated_at,
                deleted_at,
                topicId,
            }
            return res.status(201).json(question)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //Para atualizar uma pergunta
    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const {
                id,
                title,
                status,
                value,
                active,
                comment,
                created_at,
                updated_at,
                deleted_at
            } = req.body
            const { questionId } = req.params

            await knex('questions')
                .update({
                    id,
                    title,
                    status,
                    value,
                    active,
                    comment,
                    created_at,
                    updated_at,
                    deleted_at
                })
                .where({ id: questionId })

            return res.status(200).json('Pergunta editada com sucesso')
        } catch (error) {
            next(error)
        }
    },

    async markAsDeleted(req: Request, res: Response, next: any) {
        const trx = await knex.transaction();

        try {
            const { questionId } = req.params;

            // Marcar pergunta como excluída
            await trx('questions')
                .update({ deleted_at: true })
                .where({ id: questionId });

            // Marcar imagens associadas
            await trx('question_images')
                .update({ deleted_at: true })
                .where({ question_id: questionId });

            await trx.commit();
            return res.status(200).json('Pergunta e dependências marcadas como excluídas com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    },

    //Para apagar uma pergunta
    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Max-Age', '86400');

        const { questionId } = req.params;

        try {
            await knex.transaction(async (trx: any) => {
                // 1. Busca os pda_ids relacionados à question
                const pdaLinks = await trx('PDA_questionTable')
                    .where({ question_id: questionId })
                    .select('pda_id');

                const pdaIds = pdaLinks.map((item: any) => item.pda_id);
                console.log('pdas')
                console.log(pdaLinks)

                // 2. Busca os pda_ref_table_ids relacionados aos pda_ids
                const pdaRefLinks = await trx('pda_table')
                    .whereIn('id', pdaIds)
                    .select('pda_ref_table_id');

                const pdaRefIds = pdaRefLinks.map((item: any) => item.pda_ref_table_id);
                console.log('pdaRefs')
                console.log(pdaRefLinks)

                // 3. Exclui imagens relacionadas à questão
                await trx('question_images')
                    .where({ id: questionId })
                    .del();

                // 4. Exclui registros da tabela de associação
                await trx('PDA_questionTable')
                    .where({ id: questionId })
                    .del();

                // 5. Exclui registros da pda_table
                if (pdaIds.length > 0) {
                    await trx('pda_table')
                        .whereIn('id', pdaIds)
                        .del();
                }

                // 6. Exclui registros da pda_ref_table
                if (pdaRefIds.length > 0) {
                    await trx('pda_ref_table')
                        .whereIn('id', pdaRefIds)
                        .del();
                }

                // 7. Por fim, exclui a questão
                await trx('questions')
                    .where({ id: questionId })
                    .del();
            });

            return res.status(200).json('Pergunta e registros relacionados excluídos com sucesso');
        } catch (error) {
            next(error);
        }
    },

    async deleteAndChildrens(req: Request, res: Response, next: any) {
        const trx = await knex.transaction();

        try {
            const { questionId } = req.params;

            // 1. Deletar imagens da questão
            await trx('question_images')
                .where({ question_id: questionId })
                .del();

            // 2. Deletar entradas da PDA_questionTable
            await trx('PDA_questionTable')
                .where({ question_id: questionId })
                .del();

            // 3. Deletar a questão
            await trx('questions')
                .where({ id: questionId })
                .del();

            await trx.commit();
            return res.status(200).json('Questão e dados relacionados excluídos com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    }

}