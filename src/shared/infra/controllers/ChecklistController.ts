import { Request, Response } from "express";
const knex = require('../../infra/knex/connection');

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

    async UmChecklistAllInformations(req: Request, res: Response) {
        const { checklistId } = req.params
        const { id, title, description, status, active, accessMask } = req.body
        const result = await knex('checklists').where({ id: checklistId, title: title, description: description, status: status, active: active, accessMask: accessMask })

        return res.json(result)

    },


    //funcao para criar um checklist
    async create(req: Request, res: Response, next: any) {
        try {
            const { id, title, description, status, active, favorite, accessMask } = req.body
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
                accessMask,
                user_id: userId,
            })
            const checklist = {
                id,
                title,
                description,
                status,
                active,
                favorite,
                accessMask,
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
            const { id, title, description, status, active, favorite, accessMask, } = req.body
            const { checklistId } = req.params
            await knex('checklists')
                .update({
                    id,
                    title,
                    description,
                    status,
                    active,
                    favorite,
                    accessMask,
                })
                .where({ id: checklistId })
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

    async SelectAllData(req: Request, res: Response, next: any) {
        const { userId } = req.params
        console.log(userId)

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
                    'topics.id as topic_id',
                    'topics.title as topic_title',
                    'topics.description as topic_description',
                    'topics.status as topic_status',
                    'questions.id as question_id',
                    'questions.title as question_title',
                    'questions.status as question_status',
                    'questions.value as question_value',
                    'questions.active as question_active',
                    'question_images.id as question_image_id',
                    'question_images.base64 as question_image_base64',
                    'question_images.url as question_image_url',
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
                                url: row.question_image_url,
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
    }

}