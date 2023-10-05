export interface PodcastFeedResponse {
    feed: Feed;
}

export interface Feed {
    author:  Author;
    entry:   Entry[];
    updated: Icon;
    rights:  Icon;
    title:   Icon;
    icon:    Icon;
    link:    Link[];
    id:      Icon;
}

export interface Author {
    name: Icon;
    uri:  Icon;
}

export interface Icon {
    label: string;
}

export interface Entry {
    "im:name":        Icon;
    "im:image":       IMImage[];
    summary:          Icon;
    "im:price":       IMPrice;
    "im:contentType": IMContentType;
    rights?:          Icon;
    title:            Icon;
    link:             Link;
    id:               ID;
    "im:artist":      IMArtist;
    category:         Category;
    "im:releaseDate": IMReleaseDate;
}

export interface Category {
    attributes: CategoryAttributes;
}

export interface CategoryAttributes {
    "im:id": string;
    term:    PurpleLabel;
    scheme:  string;
    label:   PurpleLabel;
}

export enum PurpleLabel {
    Music = "Music",
    MusicCommentary = "Music Commentary",
    MusicHistory = "Music History",
    MusicInterviews = "Music Interviews",
}

export interface ID {
    label:      string;
    attributes: IDAttributes;
}

export interface IDAttributes {
    "im:id": string;
}

export interface IMArtist {
    label:       string;
    attributes?: IMArtistAttributes;
}

export interface IMArtistAttributes {
    href: string;
}

export interface IMContentType {
    attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
    term:  FluffyLabel;
    label: FluffyLabel;
}

export enum FluffyLabel {
    Podcast = "Podcast",
}

export interface IMImage {
    label:      string;
    attributes: IMImageAttributes;
}

export interface IMImageAttributes {
    height: string;
}

export interface IMPrice {
    label:      IMPriceLabel;
    attributes: IMPriceAttributes;
}

export interface IMPriceAttributes {
    amount:   string;
    currency: Currency;
}

export enum Currency {
    Usd = "USD",
}

export enum IMPriceLabel {
    Get = "Get",
}

export interface IMReleaseDate {
    label:      Date;
    attributes: Icon;
}

export interface Link {
    attributes: LinkAttributes;
}

export interface LinkAttributes {
    rel:   Rel;
    type?: Type;
    href:  string;
}

export enum Rel {
    Alternate = "alternate",
    Self = "self",
}

export enum Type {
    TextHTML = "text/html",
}
