import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

interface ChecklistData {
    checklist_id: number;
    checklist_title: string;
    checklist_description: string;
    checklist_created_at: string;
    checklist_updated_at: string;
    checklist_status: string;
    checklist_active: boolean;
    checklist_user_id: number;
    checklist_id_user_responded: number | null;
    checklist_accessMask: string;
    checklist_favorite: boolean;
    topics: TopicData[];
}

interface TopicData {
    topic_id: number;
    topic_title: string;
    topic_description: string;
    topic_created_at: string;
    topic_updated_at: string;
    topic_status: string;
    topic_active: boolean;
    questions: QuestionData[];
}

interface QuestionData {
    question_id: number;
    question_title: string;
    question_created_at: string;
    question_updated_at: string;
    question_status: string;
    question_active: boolean;
    question_value: string;
    question_comment: string;
    images: QuestionImage[];
    pda: PDAData[];
}

interface QuestionImage {
    question_image_id: number;
    question_image_base64: string;
    question_image_uri: string;
}

interface PDAData {
    pda_question_id: number;
    pda_id: number;
    pda_question_question_id: number;
    pda_table_id: number;
    pda_ref_table_id: number;
    pda_responsible: string;
    pda_deadline: string;
    pda_ref_pda: string;
}

module.exports = {
    //funcao para pegar todos os checklist
    async index(req: Request, res: Response) {


        const result = await knex('checklists')

        return res.json(result)

    },

    //funcao para pegar os dados de um checklist dado o id dele
    async UmChecklist(req: Request, res: Response) {
        const { checklistId } = req.params

        const result = await knex('checklists').where({ id: checklistId })

        return res.json(result)

    },

    async ChecklistOfUser(req: Request, res: Response) {
        const { userId } = req.params
        const result = await knex('checklists').where({ user_id: userId });
        return res.json(result)
    },

    async UmChecklistAllInformations(req: Request, res: Response) {
        const { checklistId } = req.params
        const { id, title, description, status, active, accessMask } = req.body
        const result = await knex('checklists').where({ id: checklistId, title: title, description: description, status: status, active: active, accessMask: accessMask })

        return res.json(result)

    },


    async OneChecklistAndCildrens(req: Request, res: Response, next: any) {
        try {
            const { checklistId } = req.params
            console.log(checklistId)
            const result = await knex('checklists')
                .select([
                    'checklists.id as checklist_id',
                    'checklists.title as checklist_title',
                    'checklists.description as checklist_description',
                    'checklists.created_at as checklist_created_at',
                    'checklists.updated_at as checklist_updated_at',
                    'checklists.deleted_at as checklist_deleted_at',
                    'checklists.status as checklist_status',
                    'checklists.active as checklist_active',
                    'checklists.user_id as checklist_user_id',
                    'checklists.id_user_responded as checklist_id_user_responded',
                    'checklists.accessMask as checklist_accessMask',
                    'checklists.favorite as checklist_favorite',


                    'topics.id as topic_id',
                    'topics.title as topic_title',
                    'topics.description as topic_description',
                    'topics.created_at as topic_created_at',
                    'topics.updated_at as topic_updated_at',
                    'topics.status as topic_status',
                    'topics.active as topic_active',
                    'topics.deleted_at as topic_deleted_at',

                    'questions.id as question_id',
                    'questions.title as question_title',
                    'questions.created_at as question_created_at',
                    'questions.updated_at as question_updated_at',
                    'questions.status as question_status',
                    'questions.active as question_active',
                    'questions.value as question_value',
                    'questions.comment as question_comment',
                    'questions.deleted_at as question_deleted_at',

                    'question_images.id as question_image_id',
                    'question_images.base64 as question_image_base64',
                    'question_images.uri as question_image_uri',
                    'question_images.question_id as question_image_question_id',

                    'PDA_questionTable.id as pda_question_id',
                    'PDA_questionTable.pda_id as pda_id',
                    'PDA_questionTable.question_id as pda_question_question_id',

                    'pda_table.id as pda_table_id',
                    'pda_table.pda_ref_table_id as pda_ref_table_id',
                    'pda_table.responsible as pda_responsible',
                    'pda_table.deadline as pda_deadline',

                    'pda_ref_table.id as pda_ref_table_id',
                    'pda_ref_table.pda as pda_ref_table_pda'
                ])
                .leftJoin('topics', 'topics.checklist_id', 'checklists.id')
                .leftJoin('questions', 'questions.topic_id', 'topics.id')
                .leftJoin('question_images', 'question_images.question_id', 'questions.id')
                .leftJoin('PDA_questionTable', 'PDA_questionTable.question_id', 'questions.id')
                .leftJoin('pda_table', 'pda_table.id', 'PDA_questionTable.pda_id')
                .leftJoin('pda_ref_table', 'pda_ref_table.id', 'pda_table.pda_ref_table_id')
                .where('checklists.id', checklistId)

            const checklists = result.reduce((acc: any, row: any) => {
                // Encontrar ou criar o checklist
                let checklist = acc.find((c: any) => c.id === row.checklist_id);
                if (!checklist) {
                    checklist = {
                        id: row.checklist_id,
                        title: row.checklist_title,
                        description: row.checklist_description,
                        status: row.checklist_status,
                        active: row.checklist_active,
                        favorite: row.checklist_favorite,
                        accessMask: row.checklist_accessMask,
                        user_id: row.checklist_user_id,
                        created_at: row.checklist_created_at,
                        updated_at: row.checklist_updated_at,
                        deleted_at: row.checklist_deleted_at,
                        topics: [],
                    };
                    acc.push(checklist);
                }

                // Encontrar ou criar o tópico
                if (row.topic_id) {
                    let topic = checklist.topics.find((t: any) => t.id === row.topic_id);
                    if (!topic) {
                        topic = {
                            id: row.topic_id,
                            title: row.topic_title,
                            description: row.topic_description,
                            status: row.topic_status,
                            active: row.topic_active,
                            created_at: row.topic_created_at,
                            updated_at: row.topic_updated_at,
                            deleted_at: row.topic_deleted_at,
                            checklist_id: row.checklist_id,
                            questions: [],
                        };
                        checklist.topics.push(topic);
                    }

                    // Encontrar ou criar a questão
                    if (row.question_id) {
                        let question = topic.questions.find((q: any) => q.id === row.question_id);
                        if (!question) {
                            question = {
                                id: row.question_id,
                                title: row.question_title,
                                status: row.question_status,
                                value: row.question_value,
                                active: row.question_active,
                                comment: row.question_comment,
                                created_at: row.question_created_at,
                                updated_at: row.question_updated_at,
                                deleted_at: row.question_deleted_at,
                                topic_id: row.topic_id,
                                images: [],
                                pda: [],
                                pda_question: [],
                                pda_ref: [],

                            };
                            topic.questions.push(question);
                        }

                        // Adicionar imagem à questão (COM VERIFICAÇÃO)
                        if (row.question_image_id) {
                            // <-- VERIFICAÇÃO ANTI-DUPLICIDADE
                            const imageExists = question.images.some((img: any) => img.id === row.question_image_id);
                            if (!imageExists) {
                                question.images.push({
                                    id: row.question_image_id,
                                    base64: row.question_image_base64,
                                    uri: row.question_image_uri,
                                    question_id: row.question_id
                                });
                            }
                        }

                        // Adicionar pda_question (COM VERIFICAÇÃO)
                        if (row.pda_question_id) {
                            // <-- VERIFICAÇÃO ANTI-DUPLICIDADE
                            const pdaQuestionExists = question.pda_question.some((pdaQ: any) => pdaQ.id === row.pda_question_id);
                            if (!pdaQuestionExists) {
                                question.pda_question.push({
                                    id: row.pda_question_id,
                                    pda_id: row.pda_table_id,
                                    question_id: row.question_id
                                });
                            }
                        }

                        // Adicionar pda_ref (COM VERIFICAÇÃO)
                        if (row.pda_ref_table_id) {
                            // <-- VERIFICAÇÃO ANTI-DUPLICIDADE
                            const pdaRefExists = question.pda_ref.some((ref: any) => ref.id === row.pda_ref_table_id);
                            if (!pdaRefExists) {
                                question.pda_ref.push({
                                    id: row.pda_ref_table_id,
                                    pda: row.pda_ref_table_pda
                                });
                            }
                        }

                        // Adicionar PDA à questão (SEU CÓDIGO AQUI JÁ ESTAVA CORRETO)
                        if (row.pda_id) {
                            let pda = question.pda.find((p: any) => p.id === row.pda_table_id);
                            if (!pda) {
                                pda = {
                                    id: row.pda_table_id,
                                    responsible: row.pda_responsible,
                                    deadline: row.pda_deadline,
                                    pda_ref_table_id: row.pda_ref_table_id,
                                };
                                question.pda.push(pda);
                            }
                        }

                    }
                }

                return acc;
            }, []);
            return res.json(checklists)

            //console.log(result)
            //return res.json(result)

        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw error;
        }

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        try {
            const { id, title, description, status, active, favorite, created_at, updated_at, accessMask, deleted_at } = req.body
            console.log('Criando um cheklist')
            console.log(id + ' ' + title + ' ' + description + ' ' + status + ' ' + active + ' ' + accessMask)
            const { userId } = req.params
            console.log(userId)
            await knex('checklists').insert({
                id,
                title,
                description,
                status,
                active,
                favorite,
                created_at,
                updated_at,
                accessMask,
                deleted_at,
                user_id: userId,
            })
            const checklist = {
                id,
                title,
                description,
                status,
                active,
                favorite,
                created_at,
                updated_at,
                accessMask,
                deleted_at,
                userId,
            }
            return res.status(201).json(checklist)
        } catch (error) {
            console.log(error)
            next(error)
        }
    },


    //funcao para atualizar um checklist
    async update(req: Request, res: Response, next: any) {
        try {
            const { title, description, status, active, favorite, accessMask, created_at, updated_at, deleted_at } = req.body
            const { checklistId } = req.params
            console.log(checklistId + ' ' + title + ' ' + description + ' ' + status + ' ' + active + ' ' + favorite + ' ' + accessMask + ' ' + created_at + ' ' + updated_at)
            await knex('checklists')
                .update({
                    title,
                    description,
                    status,
                    active,
                    favorite,
                    accessMask,
                    created_at,
                    updated_at,
                    deleted_at
                })
                .where({ id: checklistId })
            console.log(checklistId)
            return res.status(200).json('Checklist edidado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    async responded(req: Request, res: Response, next: any) {
        try {
            const { id_user_responded } = req.body
            const { checklistId } = req.params
            await knex('checklists')
                .update({
                    id_user_responded
                })
                .where({ id: checklistId })
            return res.status(200).json('Checklist respondido edidado com sucesso')
        } catch (error) {
            next(error)
        }
    },

    async markAsDeleted(req: Request, res: Response, next: any) {
        console.log('tamo deletando tamo deletando')
        const trx = await knex.transaction();

        try {
            const { checklistId } = req.params;

            // Marcar o checklist como excluído
            await trx('checklists')
                .update({ deleted_at: true })
                .where({ id: checklistId });

            // Buscar os tópicos do checklist
            const topicIds = await trx('topics')
                .where({ checklist_id: checklistId })
                .pluck('id');

            if (topicIds.length > 0) {
                // Marcar tópicos como excluídos
                await trx('topics')
                    .update({ deleted_at: true })
                    .whereIn('id', topicIds);

                // Buscar as perguntas associadas
                const questionIds = await trx('questions')
                    .whereIn('topic_id', topicIds)
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

                    // Marcar referências de planos de ação (se aplicável)
                }
            }

            await trx.commit();
            return res.status(200).json('Checklist e dependências marcados como excluídos com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    },

    //funcao para apagar um checklist
    async delete(req: Request, res: Response, next: any) {

        try {
            const { checklistId } = req.params

            await knex('checklists')
                .where({ id: checklistId })
                .del()

            return res.status(200).json('Checklist excluído com sucesso')
        } catch (error) {
            next(error)
        }
    },

    async deleteAndChildrens(req: Request, res: Response, next: any) {
        const trx = await knex.transaction();

        try {
            const { checklistId } = req.params;
            console.log(`Deletanddoo checklist com id ${checklistId} e seus agregados`)
            // Tipando os resultados explicitamente
            type Topic = { id: string };
            type Question = { id: string };
            type PDAEntry = { pda_id: string };

            // Buscar tópicos do checklist
            const topics: Topic[] = await trx('topics')
                .where({ checklist_id: checklistId })
                .select('id');

            const topicIds = topics.map(t => t.id);

            //  Buscar questões dos tópicos
            const questions: Question[] = await trx('questions')
                .whereIn('topic_id', topicIds)
                .select('id');

            const questionIds = questions.map(q => q.id);

            //  Deletar imagens das questões
            await trx('question_images')
                .whereIn('question_id', questionIds)
                .del();

            //  Buscar e deletar ligações com PDA
            const pdaQuestionEntries: PDAEntry[] = await trx('PDA_questionTable')
                .whereIn('question_id', questionIds)
                .select('pda_id');

            const pdaIds = pdaQuestionEntries.map(p => p.pda_id);

            await trx('PDA_questionTable')
                .whereIn('question_id', questionIds)
                .del();

            //  Deletar questões
            await trx('questions')
                .whereIn('id', questionIds)
                .del();

            //  Deletar tópicos
            await trx('topics')
                .whereIn('id', topicIds)
                .del();

            //  Buscar PDAs relacionados
            const pdaRefIds: string[] = await trx('pda_table')
                .whereIn('id', pdaIds)
                .pluck('pda_ref_table_id');

            //  Deletar pda_table
            await trx('pda_table')
                .whereIn('id', pdaIds)
                .del();

            //  Deletar pda_ref_table
            await trx('pda_ref_table')
                .whereIn('id', pdaRefIds)
                .del();

            //  Por fim, deletar o checklist
            await trx('checklists')
                .where({ id: checklistId })
                .del();

            await trx.commit('Checklist e dados relacionados excluídos com sucesso');
            console.log('Checklist e dados relacionados excluídos com sucesso')
            return res.status(200).json('Checklist e dados relacionados excluídos com sucesso');
        } catch (error) {
            await trx.rollback();
            next(error);
        }
    },

    async SelectAllData(req: Request, res: Response, next: any) {
        const { userId } = req.params

        try {
            const result = await knex('checklists')
                .select(
                    'checklists.id as checklist_id',
                    'checklists.title as checklist_title',
                    'checklists.description as checklist_description',
                    'checklists.status as checklist_status',
                    'checklists.active as checklist_active',
                    'checklists.favorite as checklist_favorite',
                    'checklists.accessMask as checklist_accessMask',
                    'checklists.created_at as checklist_created_at',
                    'checklists.updated_at as checklist_updated_at',
                    'topics.id as topic_id',
                    'topics.title as topic_title',
                    'topics.description as topic_description',
                    'topics.status as topic_status',
                    'topics.created_at as topic_created_at',
                    'topics.updated_at as topic_updated_at',
                    'questions.id as question_id',
                    'questions.title as question_title',
                    'questions.status as question_status',
                    'questions.value as question_value',
                    'questions.active as question_active',
                    'questions.created_at as question_created_at',
                    'questions.updated_at as question_updated_at',
                    'question_images.id as question_image_id',
                    'question_images.base64 as question_image_base64',
                    'question_images.uri as question_image_uri',
                    'PDA_questionTable.id as pda_question_id',
                    'PDA_questionTable.pda_id as pda_id',
                    'pda_table.id as pda_table_id',
                    'pda_table.pda_ref_table_id',
                    'pda_table.responsible as pda_responsible',
                    'pda_table.deadline as pda_deadline',
                    'pda_table.pda_ref_table_id as pda_pda_ref_table_id',
                    'pda_ref_table.id as pda_ref_table_id',
                    'pda_ref_table.pda as pda_ref'
                )
                .leftJoin('topics', 'checklists.id', 'topics.checklist_id')
                .leftJoin('questions', 'topics.id', 'questions.topic_id')
                .leftJoin('question_images', 'questions.id', 'question_images.question_id')
                .leftJoin('PDA_questionTable', 'questions.id', 'PDA_questionTable.question_id')
                .leftJoin('pda_table', 'PDA_questionTable.pda_id', 'pda_table.id')
                .leftJoin('pda_ref_table', 'pda_table.pda_ref_table_id', 'pda_ref_table.id')
                .where('checklists.user_id', userId);
            const checklists = result.reduce((acc: any, row: any) => {
                // Encontrar ou criar o checklist
                let checklist = acc.find((c: any) => c.id === row.checklist_id);
                if (!checklist) {
                    checklist = {
                        id: row.checklist_id,
                        title: row.checklist_title,
                        description: row.checklist_description,
                        status: row.checklist_status,
                        active: row.checklist_active,
                        favorite: row.checklist_favorite,
                        accessMask: row.checklist_accessMask,
                        created_at: row.checklist_created_at,
                        updated_at: row.checklist_updated_at,
                        topics: [],
                    };
                    acc.push([checklist]);
                }

                // Encontrar ou criar o tópico
                if (row.topic_id) {
                    let topic = checklist.topics.find((t: any) => t.id === row.topic_id);
                    if (!topic) {
                        topic = {
                            id: row.topic_id,
                            title: row.topic_title,
                            description: row.topic_description,
                            status: row.topic_status,
                            created_at: row.topic_created_at,
                            updated_at: row.topic_updated_at,
                            checklist_id: row.checklist_id,
                            questions: [],
                        };
                        checklist.topics.push(topic);
                    }

                    // Encontrar ou criar a questão
                    if (row.question_id) {
                        let question = topic.questions.find((q: any) => q.id === row.question_id);
                        if (!question) {
                            question = {
                                id: row.question_id,
                                title: row.question_title,
                                status: row.question_status,
                                value: row.question_value,
                                active: row.question_active,
                                created_at: row.question_created_at,
                                updated_at: row.question_updated_at,
                                topic_id: row.topic_id,
                                images: [],
                                pda: [],
                                pda_question: [],
                                pda_ref: [],

                            };
                            topic.questions.push(question);
                        }

                        // Adicionar imagem à questão
                        if (row.question_image_id) {
                            question.images.push({
                                id: row.question_image_id,
                                base64: row.question_image_base64,
                                uri: row.question_image_uri,
                                question_id: row.question_id
                            });
                        }

                        if (row.pda_question_id) {
                            question.pda_question.push({
                                id: row.pda_question_id,
                                pda_id: row.pda_table_id,
                                question_id: row.question_id
                            });
                        }
                        if (row.pda_ref_table_id) {
                            question.pda_ref.push({
                                id: row.pda_ref_table_id,
                                pda: row.pda_ref
                            });
                        }

                        // Adicionar PDA à questão
                        if (row.pda_id) {
                            let pda = question.pda.find((p: any) => p.id === row.pda_table_id);
                            if (!pda) {
                                pda = {
                                    id: row.pda_table_id,
                                    responsible: row.pda_responsible,
                                    deadline: row.pda_deadline,
                                    pda_ref_table_id: row.pda_ref_table_id,
                                };
                                question.pda.push(pda);
                            }
                        }

                    }
                }

                return acc;
            }, []);

            return res.json(checklists)

            //console.log(result)
            //return res.json(result)

        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            throw error;
        }
        //return res.json(result)
    },

}