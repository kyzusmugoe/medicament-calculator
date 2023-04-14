
class WebService {
    jsonUrl = "./data.json"
    constructor() {
        if (process.env.NODE_ENV == "development") {
            this.ashxPath = "http://localhost:56400/Ashx/";
        }

    }

    GetJsonData = async () => {
        return await this.asyncGetJsonData();
    }

    asyncGetJsonData = () => {
        return new Promise((resolve, reject) => {
            fetch(this.jsonUrl, {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(res => {
                resolve(res)
            }).catch(error => {
                console.error('[HIB168 錯誤]=>jsonip 取得失敗:', error)
                reject()
            });
        })
    } 

}

export default WebService

