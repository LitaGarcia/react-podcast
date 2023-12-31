export interface PodcastsResponse {
    feed: Feed;
}

export interface Feed {
    entry:   Entry[];
}

export interface Label {
    label: string;
}

export interface Entry {
    "im:name":        Label;
    "im:image":       Image[];
    summary:          Label;
    id:               Id;
    "im:artist":      Artist;
}


export interface Id {
    label:      string;
    attributes: IDAttributes;
}

export interface IDAttributes {
    "im:id": string;
}

export interface Artist {
    label:       string;
}

export interface Image {
    label:      string;
}