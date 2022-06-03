/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Date custom scalar type
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  StoryInputType: { // input type
    body: string; // String!
    cover_image: string; // String!
    id?: number | null; // Int
    tags: string[]; // [String!]!
    title: string; // String!
    topicId: number; // Int!
  }
}

export interface NexusGenEnums {
  POST_TYPE: "Bounty" | "Question" | "Story"
  VOTE_ITEM_TYPE: "Bounty" | "PostComment" | "Project" | "Question" | "Story" | "User"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
}

export interface NexusGenObjects {
  Award: { // root type
    id: number; // Int!
    image: string; // String!
    title: string; // String!
    url: string; // String!
  }
  Bounty: { // root type
    applicants_count: number; // Int!
    applications: NexusGenRootTypes['BountyApplication'][]; // [BountyApplication!]!
    body: string; // String!
    cover_image: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    deadline: string; // String!
    excerpt: string; // String!
    id: number; // Int!
    reward_amount: number; // Int!
    title: string; // String!
    votes_count: number; // Int!
  }
  BountyApplication: { // root type
    author: NexusGenRootTypes['User']; // User!
    date: string; // String!
    id: number; // Int!
    workplan: string; // String!
  }
  Category: { // root type
    cover_image?: string | null; // String
    icon?: string | null; // String
    id: number; // Int!
    title: string; // String!
  }
  Donation: { // root type
    amount: number; // Int!
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  DonationsStats: { // root type
    applications: string; // String!
    donations: string; // String!
    prizes: string; // String!
    touranments: string; // String!
  }
  Hackathon: { // root type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    location: string; // String!
    start_date: NexusGenScalars['Date']; // Date!
    title: string; // String!
    website: string; // String!
  }
  LnurlDetails: { // root type
    commentAllowed?: number | null; // Int
    maxSendable?: number | null; // Int
    metadata?: string | null; // String
    minSendable?: number | null; // Int
  }
  Mutation: {};
  PostComment: { // root type
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    parentId?: number | null; // Int
    votes_count: number; // Int!
  }
  Project: { // root type
    cover_image: string; // String!
    description: string; // String!
    id: number; // Int!
    lightning_address?: string | null; // String
    lnurl_callback_url?: string | null; // String
    screenshots: string[]; // [String!]!
    thumbnail_image: string; // String!
    title: string; // String!
    votes_count: number; // Int!
    website: string; // String!
  }
  Query: {};
  Question: { // root type
    answers_count: number; // Int!
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    title: string; // String!
    votes_count: number; // Int!
  }
  Story: { // root type
    body: string; // String!
    cover_image: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    title: string; // String!
    votes_count: number; // Int!
  }
  Tag: { // root type
    id: number; // Int!
    title: string; // String!
  }
  Topic: { // root type
    icon: string; // String!
    id: number; // Int!
    title: string; // String!
  }
  User: { // root type
    avatar: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Vote: { // root type
    amount_in_sat: number; // Int!
    id: number; // Int!
    item_id: number; // Int!
    item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
}

export interface NexusGenInterfaces {
  PostBase: NexusGenRootTypes['Bounty'] | NexusGenRootTypes['Question'] | NexusGenRootTypes['Story'];
}

export interface NexusGenUnions {
  Post: NexusGenRootTypes['Bounty'] | NexusGenRootTypes['Question'] | NexusGenRootTypes['Story'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Award: { // field return type
    id: number; // Int!
    image: string; // String!
    project: NexusGenRootTypes['Project']; // Project!
    title: string; // String!
    url: string; // String!
  }
  Bounty: { // field return type
    applicants_count: number; // Int!
    applications: NexusGenRootTypes['BountyApplication'][]; // [BountyApplication!]!
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    cover_image: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    deadline: string; // String!
    excerpt: string; // String!
    id: number; // Int!
    reward_amount: number; // Int!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    type: string; // String!
    votes_count: number; // Int!
  }
  BountyApplication: { // field return type
    author: NexusGenRootTypes['User']; // User!
    date: string; // String!
    id: number; // Int!
    workplan: string; // String!
  }
  Category: { // field return type
    apps_count: number; // Int!
    cover_image: string | null; // String
    icon: string | null; // String
    id: number; // Int!
    project: NexusGenRootTypes['Project'][]; // [Project!]!
    title: string; // String!
    votes_sum: number; // Int!
  }
  Donation: { // field return type
    amount: number; // Int!
    by: NexusGenRootTypes['User'] | null; // User
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  DonationsStats: { // field return type
    applications: string; // String!
    donations: string; // String!
    prizes: string; // String!
    touranments: string; // String!
  }
  Hackathon: { // field return type
    cover_image: string; // String!
    description: string; // String!
    end_date: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    location: string; // String!
    start_date: NexusGenScalars['Date']; // Date!
    title: string; // String!
    topics: NexusGenRootTypes['Topic'][]; // [Topic!]!
    website: string; // String!
  }
  LnurlDetails: { // field return type
    commentAllowed: number | null; // Int
    maxSendable: number | null; // Int
    metadata: string | null; // String
    minSendable: number | null; // Int
  }
  Mutation: { // field return type
    confirmDonation: NexusGenRootTypes['Donation']; // Donation!
    confirmVote: NexusGenRootTypes['Vote']; // Vote!
    createStory: NexusGenRootTypes['Story'] | null; // Story
    donate: NexusGenRootTypes['Donation']; // Donation!
    vote: NexusGenRootTypes['Vote']; // Vote!
  }
  PostComment: { // field return type
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    id: number; // Int!
    parentId: number | null; // Int
    votes_count: number; // Int!
  }
  Project: { // field return type
    awards: NexusGenRootTypes['Award'][]; // [Award!]!
    category: NexusGenRootTypes['Category']; // Category!
    cover_image: string; // String!
    description: string; // String!
    id: number; // Int!
    lightning_address: string | null; // String
    lnurl_callback_url: string | null; // String
    screenshots: string[]; // [String!]!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    thumbnail_image: string; // String!
    title: string; // String!
    votes_count: number; // Int!
    website: string; // String!
  }
  Query: { // field return type
    allCategories: NexusGenRootTypes['Category'][]; // [Category!]!
    allProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    allTopics: NexusGenRootTypes['Topic'][]; // [Topic!]!
    getAllHackathons: NexusGenRootTypes['Hackathon'][]; // [Hackathon!]!
    getCategory: NexusGenRootTypes['Category']; // Category!
    getDonationsStats: NexusGenRootTypes['DonationsStats']; // DonationsStats!
    getFeed: NexusGenRootTypes['Post'][]; // [Post!]!
    getLnurlDetailsForProject: NexusGenRootTypes['LnurlDetails']; // LnurlDetails!
    getPostById: NexusGenRootTypes['Post']; // Post!
    getProject: NexusGenRootTypes['Project']; // Project!
    getTrendingPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    hottestProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    me: NexusGenRootTypes['User'] | null; // User
    newProjects: NexusGenRootTypes['Project'][]; // [Project!]!
    popularTopics: NexusGenRootTypes['Topic'][]; // [Topic!]!
    projectsByCategory: NexusGenRootTypes['Project'][]; // [Project!]!
    searchProjects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Question: { // field return type
    answers_count: number; // Int!
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    comments: NexusGenRootTypes['PostComment'][]; // [PostComment!]!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    type: string; // String!
    votes_count: number; // Int!
  }
  Story: { // field return type
    author: NexusGenRootTypes['User']; // User!
    body: string; // String!
    comments: NexusGenRootTypes['PostComment'][]; // [PostComment!]!
    comments_count: number; // Int!
    cover_image: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    tags: NexusGenRootTypes['Tag'][]; // [Tag!]!
    title: string; // String!
    topic: NexusGenRootTypes['Topic']; // Topic!
    type: string; // String!
    votes_count: number; // Int!
  }
  Tag: { // field return type
    id: number; // Int!
    title: string; // String!
  }
  Topic: { // field return type
    icon: string; // String!
    id: number; // Int!
    title: string; // String!
  }
  User: { // field return type
    avatar: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Vote: { // field return type
    amount_in_sat: number; // Int!
    id: number; // Int!
    item_id: number; // Int!
    item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    paid: boolean; // Boolean!
    payment_hash: string; // String!
    payment_request: string; // String!
  }
  PostBase: { // field return type
    body: string; // String!
    createdAt: NexusGenScalars['Date']; // Date!
    excerpt: string; // String!
    id: number; // Int!
    title: string; // String!
    votes_count: number; // Int!
  }
}

export interface NexusGenFieldTypeNames {
  Award: { // field return type name
    id: 'Int'
    image: 'String'
    project: 'Project'
    title: 'String'
    url: 'String'
  }
  Bounty: { // field return type name
    applicants_count: 'Int'
    applications: 'BountyApplication'
    author: 'User'
    body: 'String'
    cover_image: 'String'
    createdAt: 'Date'
    deadline: 'String'
    excerpt: 'String'
    id: 'Int'
    reward_amount: 'Int'
    tags: 'Tag'
    title: 'String'
    type: 'String'
    votes_count: 'Int'
  }
  BountyApplication: { // field return type name
    author: 'User'
    date: 'String'
    id: 'Int'
    workplan: 'String'
  }
  Category: { // field return type name
    apps_count: 'Int'
    cover_image: 'String'
    icon: 'String'
    id: 'Int'
    project: 'Project'
    title: 'String'
    votes_sum: 'Int'
  }
  Donation: { // field return type name
    amount: 'Int'
    by: 'User'
    createdAt: 'Date'
    id: 'Int'
    paid: 'Boolean'
    payment_hash: 'String'
    payment_request: 'String'
  }
  DonationsStats: { // field return type name
    applications: 'String'
    donations: 'String'
    prizes: 'String'
    touranments: 'String'
  }
  Hackathon: { // field return type name
    cover_image: 'String'
    description: 'String'
    end_date: 'Date'
    id: 'Int'
    location: 'String'
    start_date: 'Date'
    title: 'String'
    topics: 'Topic'
    website: 'String'
  }
  LnurlDetails: { // field return type name
    commentAllowed: 'Int'
    maxSendable: 'Int'
    metadata: 'String'
    minSendable: 'Int'
  }
  Mutation: { // field return type name
    confirmDonation: 'Donation'
    confirmVote: 'Vote'
    createStory: 'Story'
    donate: 'Donation'
    vote: 'Vote'
  }
  PostComment: { // field return type name
    author: 'User'
    body: 'String'
    createdAt: 'Date'
    id: 'Int'
    parentId: 'Int'
    votes_count: 'Int'
  }
  Project: { // field return type name
    awards: 'Award'
    category: 'Category'
    cover_image: 'String'
    description: 'String'
    id: 'Int'
    lightning_address: 'String'
    lnurl_callback_url: 'String'
    screenshots: 'String'
    tags: 'Tag'
    thumbnail_image: 'String'
    title: 'String'
    votes_count: 'Int'
    website: 'String'
  }
  Query: { // field return type name
    allCategories: 'Category'
    allProjects: 'Project'
    allTopics: 'Topic'
    getAllHackathons: 'Hackathon'
    getCategory: 'Category'
    getDonationsStats: 'DonationsStats'
    getFeed: 'Post'
    getLnurlDetailsForProject: 'LnurlDetails'
    getPostById: 'Post'
    getProject: 'Project'
    getTrendingPosts: 'Post'
    hottestProjects: 'Project'
    me: 'User'
    newProjects: 'Project'
    popularTopics: 'Topic'
    projectsByCategory: 'Project'
    searchProjects: 'Project'
  }
  Question: { // field return type name
    answers_count: 'Int'
    author: 'User'
    body: 'String'
    comments: 'PostComment'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    tags: 'Tag'
    title: 'String'
    type: 'String'
    votes_count: 'Int'
  }
  Story: { // field return type name
    author: 'User'
    body: 'String'
    comments: 'PostComment'
    comments_count: 'Int'
    cover_image: 'String'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    tags: 'Tag'
    title: 'String'
    topic: 'Topic'
    type: 'String'
    votes_count: 'Int'
  }
  Tag: { // field return type name
    id: 'Int'
    title: 'String'
  }
  Topic: { // field return type name
    icon: 'String'
    id: 'Int'
    title: 'String'
  }
  User: { // field return type name
    avatar: 'String'
    id: 'Int'
    name: 'String'
  }
  Vote: { // field return type name
    amount_in_sat: 'Int'
    id: 'Int'
    item_id: 'Int'
    item_type: 'VOTE_ITEM_TYPE'
    paid: 'Boolean'
    payment_hash: 'String'
    payment_request: 'String'
  }
  PostBase: { // field return type name
    body: 'String'
    createdAt: 'Date'
    excerpt: 'String'
    id: 'Int'
    title: 'String'
    votes_count: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    confirmDonation: { // args
      payment_request: string; // String!
      preimage: string; // String!
    }
    confirmVote: { // args
      payment_request: string; // String!
      preimage: string; // String!
    }
    createStory: { // args
      data?: NexusGenInputs['StoryInputType'] | null; // StoryInputType
    }
    donate: { // args
      amount_in_sat: number; // Int!
    }
    vote: { // args
      amount_in_sat: number; // Int!
      item_id: number; // Int!
      item_type: NexusGenEnums['VOTE_ITEM_TYPE']; // VOTE_ITEM_TYPE!
    }
  }
  Query: {
    allProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    getAllHackathons: { // args
      sortBy?: string | null; // String
      topic?: number | null; // Int
    }
    getCategory: { // args
      id: number; // Int!
    }
    getFeed: { // args
      skip?: number | null; // Int
      sortBy: string | null; // String
      take: number | null; // Int
      topic?: number | null; // Int
    }
    getLnurlDetailsForProject: { // args
      project_id: number; // Int!
    }
    getPostById: { // args
      id: number; // Int!
      type: NexusGenEnums['POST_TYPE']; // POST_TYPE!
    }
    getProject: { // args
      id: number; // Int!
    }
    hottestProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    newProjects: { // args
      skip?: number | null; // Int
      take: number | null; // Int
    }
    projectsByCategory: { // args
      category_id: number; // Int!
      skip?: number | null; // Int
      take: number | null; // Int
    }
    searchProjects: { // args
      search: string; // String!
      skip?: number | null; // Int
      take: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Post: "Bounty" | "Question" | "Story"
  PostBase: "Bounty" | "Question" | "Story"
}

export interface NexusGenTypeInterfaces {
  Bounty: "PostBase"
  Question: "PostBase"
  Story: "PostBase"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Post" | "PostBase";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}