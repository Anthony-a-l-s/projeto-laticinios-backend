import { Request, Response } from "express";
const knex = require('../knex/connection');
const ChecklistController = require('./ChecklistController');
const TopicsController = require('./TopicsController');
const QuestionsController = require('./QuestionsController');

type Topic = { id: string };
type Question = { id: string };

function verifyIfDateIs30DaysAgo(dataParaComparar: string): boolean {
    const dataEntrada = new Date(dataParaComparar);
    if (isNaN(dataEntrada.getTime())) {
        console.error("Data de entrada inválida.");
        return false;
    }

    const hoje = new Date();
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    // Para uma comparação precisa, zeramos as horas de ambas as datas
    dataEntrada.setHours(0, 0, 0, 0);
    trintaDiasAtras.setHours(0, 0, 0, 0);

    // Comparamos o valor numérico das datas (timestamp)
    return dataEntrada.getTime() === trintaDiasAtras.getTime();
}

module.exports = {
    async verifyChecklistsDeleted(next: any) {
        const trx = await knex.transaction();
        try {

            const checklist = await knex('checklist').where('deleted', 1);
            for (const item of checklist) {
                await trx('checklists')
                    .where({ id: item.id })
                    .del()

                // Buscar tópicos do checklist
                const topics: Topic[] = await trx('topics')
                    .where({ checklist_id: item.id })
                    .select('id');

                const topicIds = topics.map(t => t.id);

                //  Buscar questões dos tópicos
                const questions: Question[] = await trx('questions')
                    .whereIn('topic_id', topicIds)
                    .select('id');

                const questionIds = questions.map(q => q.id);

                await trx('questions')
                    .whereIn('id', questionIds)
                    .del();

                //  Deletar tópicos
                await trx('topics')
                    .whereIn('id', topicIds)
                    .del();

                await trx('checklists')
                    .where({ id: item.id })
                    .del();
            }
        } catch (error) {
            console.log(error);
            next(error)
        }

    },

    async verifyTopicsDeleted(next: any) {
        const trx = await knex.transaction();

        try {
            const topics = await trx('topics').where('deleted', 1);
            for (const item of topics) {

                const questions: Question[] = await trx('questions')
                    .whereIn('topic_id', item.id)
                    .select('id');

                const questionIds = questions.map(q => q.id);

                await trx('questions')
                    .whereIn('id', questionIds)
                    .del();

                await trx('topics')
                    .where({ id: item.id })
                    .del()
            }
        } catch (error) {
            console.log(error);
            next(error)
        }

    },

    async verifyQuestionsDeleted(next: any) {
        const trx = await knex.transaction();

        try {
            const questions = await trx('questions').where('deleted', 1);
            for (const item of questions) {
                await trx('questions')
                    .where({ id: item.id })
                    .del()
            }
        } catch (error) {
            console.log(error);
            next(error)
        }

    }

}