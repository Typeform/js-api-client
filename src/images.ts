import {Typeform} from './typeform-types'

export class Images {
    constructor(private _http: Typeform.HTTPClient) {
    }

    public add(args: {
        image?: string
        url?: string
        fileName: string
    }): Promise<Typeform.Image> {
        const {image, url, fileName} = args

        return this._http.request({
            method: 'post',
            url: `/images`,
            data: {
                image,
                file_name: fileName,
                url,
            },
        })
    }

    public delete(args: { id: string }): Promise<null> {
        const {id} = args

        return this._http.request({
            method: 'delete',
            url: `/images/${id}`,
        })
    }

    public get(args: {
        id: string
        size?: string
        backgroundSize?: string
        choiceSize?: string
    }): Promise<Typeform.Image> {
        const {id, size, backgroundSize, choiceSize} = args
        const requestQuery: Typeform.Request = {
            method: 'get',
            url: `/images/${id}`,
            headers: {
                Accept: 'application/json',
            },
        }

        const choiceImageSizes = [
            'default',
            'thumbnail',
            'supersize',
            'supermobile',
            'supersizefit',
            'supermobilefit',
        ]

        if (size) {
            if (['default', 'thumbnail', 'mobile'].includes(size)) {
                requestQuery.url += `/image/${size}`
            } else {
                throw new Error(`Image size doesn't exist`)
            }
        } else if (backgroundSize) {
            if (
                ['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)
            ) {
                requestQuery.url += `/background/${backgroundSize}`
            } else {
                throw new Error(`Image background size doesn't exist`)
            }
        } else if (choiceSize) {
            if (choiceImageSizes.includes(choiceSize)) {
                requestQuery.url += `/choice/${choiceSize}`
            } else {
                throw new Error(`Image choice size doesn't exist`)
            }
        }

        return this._http.request(requestQuery)
    }

    public list(): Promise<Typeform.Image[]> {
        return this._http.request({
            method: 'get',
            url: '/images',
        })
    }
}
