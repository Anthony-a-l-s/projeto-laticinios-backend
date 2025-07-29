import { Request, Response } from "express";
const knex = require('../knex/connection');

module.exports = {

    async index(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const result = await knex('topics')

        return res.json(result)

    },


    async lista_pelo_checklist(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { checklistId } = req.params

        const result = await knex('topics').where({ checklist_id: checklistId })

        return res.json(result)

    },

    async lista_pelo_id(req: Request, res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        const { topicId } = req.params
        console.log('topic id: ' + topicId)
        const result = await knex('topics').where({ id: topicId })
        return res.json(result)

    },

    async create(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { id, title, description, status, active, created_at, updated_at, deleted_at } = req.body
            const { checklistId } = req.params

            await knex('topics').insert({
                id,
                title,
                description,
                status,
                active,
                deleted_at,
                checklist_id: checklistId,
                created_at: created_at,
                updated_at: updated_at,
            })
            const topic = {
                id,
                title,
                description,
                status,
                active,
                checklistId,
                created_at,
                updated_at,
                deleted_at
            }
            return res.status(200).json(topic)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },

    async update(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { id, title, description, status, active, created_at, updated_at, deleted_at } = req.body
            const { topicId } = req.params

            await knex('topics')
                .update({
                    id,
                    title,
                    description,
                    status,
                    active,
                    created_at,
                    updated_at,
                    deleted_at
                }).where({ id: topicId })

            return res.status(200).json('Tópico editado com sucesso!')
        } catch (error) {
            next(error)
        }
    },

    async markAsDeleted(req: Request, res: Response, next: any) {
        const trx = await knex.transaction();

        try {
            const { topicId } = req.params;

            // Marcar tópico como excluído
            await trx('topics')
                .update({ deleted_at: true })
                .where({ id: topicId });

            // Buscar as perguntas do tópico
            const questionIds = await trx('questions')
                .where({ topic_id: topicId })
                .pluck('id');

            if (questionIds.length > 0) {
                // Marcar perguntas como excluídas
                await trx('questions')
                    .update({ deleted_at: true })
                    .whereIn('id', questionIds);

                // Marcar imagens das perguntas
                await trx('question_images')
                    .update({ deleted_at: true })
                    .whereIn('question_id', questionIds);

            }

            await trx.commit();
            return res.status(200).json('Tópico e dependências marcados como excluídos com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    },



    async delete(req: Request, res: Response, next: any) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Max-Age', '86400')
        try {
            const { topicId } = req.params

            await knex('topics')
                .where({ id: topicId })
                .del()

            return res.status(200).json('Tópico excluído com sucesso!')
        } catch (error) {
            next(error)
        }
    },

    async deleteAndChildrens(req: Request, res: Response, next: any) {
        const trx = await knex.transaction();

        try {
            const { topicId } = req.params;

            type Question = { id: string };
            type PDAEntry = { pda_id: string };

            // 1. Buscar questões do tópico
            const questions: Question[] = await trx('questions')
                .where({ topic_id: topicId })
                .select('id');

            const questionIds = questions.map(q => q.id);

            // 2. Deletar imagens das perguntas
            await trx('question_images')
                .whereIn('question_id', questionIds)
                .del();

            // 3. Buscar e deletar entradas da PDA_questionTable
            await trx('PDA_questionTable')
                .whereIn('question_id', questionIds)
                .del();

            // 4. Deletar perguntas
            await trx('questions')
                .whereIn('id', questionIds)
                .del();

            // 5. Deletar o tópico
            await trx('topics')
                .where({ id: topicId })
                .del();

            await trx.commit();
            return res.status(200).json('Tópico e dados relacionados excluídos com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    }

}

