// Используется для обновления слушателей в классе AuthHolder
export default interface AuthListener {
    onAuthChanged: () => void 
}