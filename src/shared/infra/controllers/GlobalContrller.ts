import { verify } from "crypto";
import { Request, Response } from "express";
const knex = require('../knex/connection');
const ChecklistController = require('./ChecklistController');
const TopicsController = require('./TopicsController');
const QuestionsController = require('./QuestionsController');

type Topic = { id: string };
type Question = { id: string };


function isWithinLast30Days(dataParaComparar: string): boolean {
    console.log("Verificando data:", dataParaComparar);
    const dataEntrada = new Date(dataParaComparar);
    if (isNaN(dataEntrada.getTime())) {
        console.error("Data de entrada inválida.");
        return false;
    }

    const hoje = new Date(); // Data e hora de agora
    const trintaDiasAtras = new Date();

    // Calcula o momento exato de 30 dias atrás
    trintaDiasAtras.setDate(hoje.getDate() - 30);

    // NÃO ZERAMOS MAIS AS HORAS

    // Comparamos os timestamps
    // A data de entrada deve ser:
    // 1. Maior ou igual (>=) a 30 dias atrás
    // 2. Menor ou igual (<=) a data/hora de hoje

    const timestampEntrada = dataEntrada.getTime();

    return (
        timestampEntrada >= trintaDiasAtras.getTime() &&
        timestampEntrada <= hoje.getTime()
    );
}

module.exports = {

    async verifyDataDeleted() {
        try {
            await this.verifyChecklistsDeleted();
            await this.verifyTopicsDeleted();
            await this.verifyQuestionsDeleted();
        } catch (error) {
            console.log(error)
        }
    },


    async verifyChecklistsDeleted() {
        // 1. Inicia a transação
        const trx = await knex.transaction();

        try {
            // 2. [BOA PRÁTICA] Use 'trx' para TODAS as queries dentro da transação
            const checklist = await trx('checklists').where('deleted_at', 1);

            for (const item of checklist) {
                console.log(isWithinLast30Days(item.created_at));

                // A lógica está: "se NÃO foi criado nos últimos 30 dias"
                // (ou seja, foi criado há mais de 30 dias)
                if (!isWithinLast30Days(item.created_at)) {
                    console.log(`Checklist ID ${item.id} atingiu 30 dias. Iniciando remoção completa...`);

                    // --- ORDEM DE DELEÇÃO CORRIGIDA ---
                    // Primeiro, delete os "filhos" (questions) e "netos" (topics)

                    // Buscar tópicos do checklist
                    const topics: Topic[] = await trx('topics')
                        .where({ checklist_id: item.id })
                        .select('id');

                    const topicIds = topics.map(t => t.id);

                    if (topicIds.length > 0) {
                        // Buscar questões dos tópicos
                        const questions: Question[] = await trx('questions')
                            .whereIn('topic_id', topicIds)
                            .select('id');

                        const questionIds = questions.map(q => q.id);

                        if (questionIds.length > 0) {
                            // Deletar questões
                            await trx('questions')
                                .whereIn('id', questionIds)
                                .del();
                        }

                        // Deletar tópicos
                        await trx('topics')
                            .whereIn('id', topicIds)
                            .del();
                    }

                    // 3. [CORREÇÃO] Delete o checklist principal POR ÚLTIMO, 
                    //    e apenas UMA vez.
                    await trx('checklists')
                        .where({ id: item.id })
                        .del();

                    console.log(`Checklist ID ${item.id} e seus dados relacionados foram deletados.`);
                } else {
                    console.log(`Checklist ID ${item.id} não atingiu 30 dias desde a criação.`);
                }
            }

            // 4. [PROBLEMA PRINCIPAL] Efetivar a transação!
            //    Sem isso, nada é salvo no banco.
            await trx.commit();
            console.log('Verificação de checklists deletados concluída. Transação efetivada.');

        } catch (error) {
            console.log('ERRO durante a transação:', error);

            // 5. [CORREÇÃO] Se der erro, desfazer a transação
            await trx.rollback();
            console.log('Transação desfeita (rollback).');
        }
    },

    async verifyTopicsDeleted() {
        const trx = await knex.transaction();

        try {
            const topics = await trx('topics').where('deleted_at', 1);
            for (const item of topics) {
                if (!isWithinLast30Days(item.created_at)) {
                    console.log(`Topic ID ${item.id} atingiu 30 dias. Removendo...`);

                    // [CORREÇÃO 1]: 'whereIn' trocado por 'where'
                    // item.id é um valor único, não um array.
                    const questions: Question[] = await trx('questions')
                        .where({ topic_id: item.id }) // <-- Corrigido
                        .select('id');

                    const questionIds = questions.map(q => q.id);

                    // Deletar "filhos" (questions) primeiro
                    if (questionIds.length > 0) {
                        await trx('questions')
                            .whereIn('id', questionIds)
                            .del();
                    }

                    // Deletar "pai" (topic) por último
                    await trx('topics')
                        .where({ id: item.id })
                        .del();

                    // [CORREÇÃO 2]: Log de sucesso estava incompleto
                    console.log(`Topic ID ${item.id} e suas questões foram deletados.`);
                } else {
                    console.log(`Topic ID ${item.id} não atingiu 30 dias desde a exclusão.`);
                }
            }

            // [CORREÇÃO 3]: Efetivar a transação
            await trx.commit();
            console.log('Verificação de tópicos deletados concluída. Transação efetivada.');

        } catch (error) {
            console.log('ERRO ao deletar tópicos:', error);

            // [CORREÇÃO 4]: Desfazer a transação em caso de erro
            await trx.rollback();
            console.log('Transação desfeita (rollback).');
        }
    },

    async verifyQuestionsDeleted() {
        const trx = await knex.transaction();

        try {
            const questions = await trx('questions').where('deleted_at', 1);
            for (const item of questions) {
                if (!isWithinLast30Days(item.created_at)) {
                    await trx('questions')
                        .where({ id: item.id })
                        .del();
                    console.log(`Question ID ${item.id} foi deletada.`);
                } else {
                    console.log(`Question ID ${item.id} não atingiu 30 dias desde a exclusão.`);
                }
            }

            // [CORREÇÃO 1]: Efetivar a transação
            await trx.commit();
            console.log('Verificação de questões deletadas concluída. Transação efetivada.');

        } catch (error) {
            console.log('ERRO ao deletar questões:', error);

            // [CORREÇÃO 2]: Desfazer a transação em caso de erro
            await trx.rollback();
            console.log('Transação desfeita (rollback).');
        }
    }

}