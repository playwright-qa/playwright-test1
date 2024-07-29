import Header from "../components/Header";


export default class BasePage {
    constructor(page, url) {
        this._page = page
        this._url = url
        this.header = new Header(page)
    }

    async navigate(){
        await this._page.goto(this._url)
    }
}