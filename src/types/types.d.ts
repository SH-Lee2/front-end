export interface Post {
    useNo?:number,
    useNick?:string,
    artNo: number,
    artCategory?:number,
    artSubject: string,
    artContents?:string,
    artCreated?:string,
    imgSave ?: string | null,
	imgPath: string,
    regNo?:string,
    regAddr1: string,
    regAddr2: string,
	artWselect?:number,
}

export type PageT = {
    [key :string] :number
}

export interface Token {
	useId?: string;
	useRole: string;
	useNick: string;
	useNo: number;
	sub?: string;
	role?: string;
    snsNick?:number;
}

export interface CommentT {
    repContents: string;
    repCreated: string;
    repNo: number;
    useNick: string;
    artCategory: number;
    artNo: number;
    useNo?:number;
}


export interface Region {
	regNo: string;
	regAddr1: string;
	regAddr2: string;

}

export interface UserT {
    useNo: number,
    useNick: string,
    useId: string,
    usePw: string,
    useName: string,
    useEmail: string,
    useRole :string,
}