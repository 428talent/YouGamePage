export default interface DataStore<T> {
    getIndex():Array<number>
    getItemByIndex(id:number):T
}
