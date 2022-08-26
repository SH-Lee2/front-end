export interface Post {
	useNo?: number;
	useNick?: string;
	artNo: number;
	artCategory?: number;
	artSubject: string;
	artContents?: string;
	artCreated?: string;
	imgSave?: string | null;
	regNo?: string;
	regAddr1: string;
	regAddr2: string;
	artWSelect?: number;
}

export type PageT = {
	[key: string]: number;
};

export interface Token {
	useId?: string;
	useRole: string;
	useNick: string;
	useNo: number;
	sub?: string;
	role?: string;
}

export interface CommentT {
    repContents: string;
    repCreated: string;
    repNo: number;
    useNick: string;
}

export interface Region {
	regNo: string;
	regAddr1: string;
	regAddr2: string;
}

export interface ImageArr {
	imgOrigin: string;
	imgPath: string;
}
