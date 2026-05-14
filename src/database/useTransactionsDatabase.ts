import { useSQLiteContext } from "expo-sqlite";
import { TransactionTypes } from "../utils/transactionTypes";

export type TransactionCreate = {
    target_id: number;
    amount: number;
    observation?: string;
}

export type TransactionResponse = {
    id: number;
    amount: number;
    observation: string;
    target_id: number;
    created_at: Date;
    updated_at: Date;
}

export type TransactionSummaryResponse = {
    total: number;
    input: number;
    output: number;
}

export function useTransactionsDatabase() {
    const database = useSQLiteContext();

    async function listByTargetId(id: number) {
        return database.getAllAsync<TransactionResponse>(`
            SELECT id, target_id, amount, observation, created_at, updated_at
            FROM transactions
            WHERE target_id = ${id}
            ORDER BY created_at DESC
            `)
    }

    async function create(data: TransactionCreate) {
        const statement = await database.prepareAsync(`
            INSERT INTO transactions (target_id, amount, observation) 
            VALUES ($target_id, $amount, $observation)
            `)
        await statement.executeAsync({
            $target_id: data.target_id,
            $amount: data.amount,
            $observation: data.observation ?? null,
        })
    }

    async function removeTransaction(id: number) {
        await database.runAsync("DELETE FROM transactions WHERE id = ?", [id]);
    }
    async function findSummary() {
            return database.getFirstAsync<TransactionSummaryResponse>(`
                SELECT
                COALESCE(SUM(amount), 0) AS total,
                COALESCE(SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END), 0) AS input,
                COALESCE(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END), 0) AS output
                FROM transactions
                `)
        }
    
    return {
        listByTargetId,
        create,
        removeTransaction,
        findSummary,
    }
}