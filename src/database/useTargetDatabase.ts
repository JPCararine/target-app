import { useSQLiteContext } from "expo-sqlite"

export type TargetCreate = {
    name: string,
    amount: number
}

export type TargetUpdate = TargetCreate & {
    id: number;
}

export type TargetResponse = {
    id: number;
    name: string;
    amount: number;
    current: number;
    percentage: number;
    created_at: Date;
    updated_at: Date
}
export type TargetSummaryResponse = {
  current: number;
}

export function useTargetDatabase() {
    const database = useSQLiteContext();

    async function listBySavedValue() {
        return database.getAllAsync<TargetResponse>(`
            SELECT targets.id, targets.name, targets.amount, 
            COALESCE(SUM(transactions.amount), 0) AS current,
            COALESCE(SUM(transactions.amount), 0) * 100.0 / targets.amount AS percentage
            FROM targets
            LEFT JOIN transactions ON targets.id = transactions.target_id
            GROUP BY targets.id, targets.name, targets.amount
            ORDER BY current DESC
            `)

    }

    async function findById(id: number) {
        return database.getFirstAsync<TargetResponse>(` 
            SELECT targets.id, targets.name, targets.amount, 
            COALESCE(SUM(transactions.amount), 0) AS current,
            COALESCE(SUM(transactions.amount), 0) * 100.0 / targets.amount AS percentage
            FROM targets
            LEFT JOIN transactions ON targets.id = transactions.target_id
            WHERE targets.id = ?`, [id]);
    }
    async function create(data: TargetCreate) {
        const statement = await database.prepareAsync(
            "INSERT INTO targets (name, amount) VALUES ($name, $amount)"
        )

        await statement.executeAsync({
            $name: data.name,
            $amount: data.amount,
        })
    }
    async function update(data: TargetUpdate) {
        const statement = await database.prepareAsync(`
            UPDATE targets SET
                name = $name,
                amount = $amount,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $id
            `)

            statement.executeAsync({
                $id: data.id,
                $name: data.name,
                $amount: data.amount
            })
    }
    async function deleteTarget(id: number) {
        await database.runAsync("DELETE FROM targets WHERE id = ?", [id]);
    }

    return {
        create,
        listBySavedValue,
        findById,
        update,
        deleteTarget,
        
    }
}