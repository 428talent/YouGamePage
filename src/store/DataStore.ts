export default interface DataStore<T> {
    getIndex():Array<number>
    getItemByIndex(id:number):T
    addItems(items:Array<T>)
    removeItems(ids:  Array<number>)
}
