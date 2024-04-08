export type APISchemas = {
  AddressDto: {
    building?: string
    cityPriorityDistrict?: boolean
    door?: string
    elevator?: boolean
    floor?: string
    l1?: string
    l2?: string
    l3?: string
    l4?: string
    l5?: string
    l6?: string
    l7?: string
    staircase?: string
  }
  CampaignContextDto: {
    campaign?: string
    campaignLabel?: string
    communicationRequestConfiguration?: boolean
    contactAttemptConfiguration?: "F2F" | "TEL"
    contactOutcomeConfiguration?: "F2F" | "TEL"
    email?: string
    identificationConfiguration?: "IASCO" | "NOIDENT"
    referents?: Array<APISchemas["ReferentDto"]>
    visibilities?: Array<APISchemas["VisibilityContextDto"]>
  }
  CampaignDto: {
    /* Format: int64 */
    allocated?: number
    /* Format: int64 */
    collectionEndDate?: number
    /* Format: int64 */
    collectionStartDate?: number
    communicationRequestConfiguration?: boolean
    contactAttemptConfiguration?: "F2F" | "TEL"
    contactOutcomeConfiguration?: "F2F" | "TEL"
    email?: string
    /* Format: int64 */
    endDate?: number
    /* Format: int64 */
    finalized?: number
    id?: string
    identificationConfiguration?: "IASCO" | "NOIDENT"
    /* Format: int64 */
    identificationPhaseStartDate?: number
    /* Format: int64 */
    interviewerStartDate?: number
    label?: string
    /* Format: int64 */
    managementStartDate?: number
    preference?: boolean
    referents?: Array<APISchemas["ReferentDto"]>
    /* Format: int64 */
    toAffect?: number
    /* Format: int64 */
    toFollowUp?: number
    /* Format: int64 */
    toProcessInterviewer?: number
    /* Format: int64 */
    toReview?: number
  }
  ClosingCauseCountDto: {
    /* Format: int64 */
    npaCount?: number
    /* Format: int64 */
    npiCount?: number
    /* Format: int64 */
    npxCount?: number
    /* Format: int64 */
    rowCount?: number
    /* Format: int64 */
    total?: number
  }
  ClosingCauseDto: {
    /* Format: int64 */
    date?: number
    type?: "NPA" | "NPI" | "NPX" | "ROW"
  }
  CommentDto: { type?: "INTERVIEWER" | "MANAGEMENT"; value?: string }
  CommunicationRequestDto: {
    emiter?: "TOOL" | "INTERVIEWER"
    /* Format: int64 */
    id?: number
    medium?: "MAIL" | "EMAIL"
    messhugahId?: string
    reason?: "REFUSAL" | "UNREACHABLE"
    status?: Array<APISchemas["CommunicationRequestStatusDto"]>
    type?: "REMINDER" | "NOTICE"
  }
  CommunicationRequestStatusDto: {
    /* Format: int64 */
    date?: number
    /* Format: int64 */
    id?: number
    status?:
      | "INITIATED"
      | "READY"
      | "SUBMITTED"
      | "UNDELIVERED"
      | "FAILED"
      | "CANCELLED"
  }
  ContactAttemptDto: {
    /* Format: int64 */
    date?: number
    medium?: "TEL" | "EMAIL" | "FIELD"
    status?:
      | "INA"
      | "APT"
      | "REF"
      | "TUN"
      | "NOC"
      | "MES"
      | "UCD"
      | "NLH"
      | "NPS"
      | "PUN"
  }
  ContactOutcomeDto: {
    /* Format: int64 */
    date?: number
    /* Format: int32 */
    totalNumberOfContactAttempts?: number
    type?:
      | "INA"
      | "REF"
      | "IMP"
      | "UCD"
      | "UTR"
      | "ALA"
      | "DUK"
      | "DUU"
      | "DCD"
      | "NUH"
      | "NOA"
  }
  ContactOutcomeTypeCountCampaignDto: {
    france?: APISchemas["ContactOutcomeTypeCountDto"]
    organizationUnits?: Array<APISchemas["ContactOutcomeTypeCountDto"]>
  }
  ContactOutcomeTypeCountDto: {
    /* Format: int64 */
    alaCount?: number
    campaign?: APISchemas["CampaignDto"]
    /* Format: int64 */
    dcdCount?: number
    /* Format: int64 */
    dukCount?: number
    /* Format: int64 */
    duuCount?: number
    idDem?: string
    /* Format: int64 */
    impCount?: number
    /* Format: int64 */
    inaCount?: number
    labelDem?: string
    /* Format: int64 */
    noaCount?: number
    /* Format: int64 */
    nuhCount?: number
    /* Format: int64 */
    refCount?: number
    /* Format: int64 */
    total?: number
    /* Format: int64 */
    ucdCount?: number
    /* Format: int64 */
    utrCount?: number
  }
  CountDto: {
    /* Format: int32 */
    count?: number
  }
  HabilitationDto: { habilitated?: boolean }
  IdentificationDto: {
    access?: "ACC" | "NACC"
    category?: "PRIMARY" | "OCCASIONAL" | "DK" | "SECONDARY" | "VACANT"
    identification?: "IDENTIFIED" | "DESTROY" | "UNIDENTIFIED"
    occupant?: "IDENTIFIED" | "UNIDENTIFIED"
    situation?: "ORDINARY" | "ABSORBED" | "NOORDINARY"
  }
  InterviewerContextDto: {
    email?: string
    firstName?: string
    id?: string
    lastName?: string
    phoneNumber?: string
    title?: "MISS" | "MISTER"
  }
  InterviewerDto: {
    id?: string
    interviewerFirstName?: string
    interviewerLastName?: string
    /* Format: int64 */
    surveyUnitCount?: number
  }
  JsonNode: {}
  MailDto: { content?: string; subject?: string }
  MessageDto: {
    /* Format: int64 */
    date?: number
    /* Format: int64 */
    id?: number
    recipients?: Array<string>
    sender?: string
    status?: string
    text?: string
    typedRecipients?: Array<APISchemas["VerifyNameResponseDto"]>
  }
  OngoingDto: { ongoing?: boolean }
  OrganizationUnitContextDto: {
    id?: string
    label?: string
    organisationUnitRef?: Array<string>
    type?: "LOCAL" | "NATIONAL"
    users?: Array<APISchemas["UserContextDto"]>
  }
  OrganizationUnitDto: { id?: string; label?: string }
  PersonDto: {
    /* Format: int64 */
    birthdate?: number
    email?: string
    favoriteEmail?: boolean
    firstName?: string
    /* Format: int64 */
    id?: number
    lastName?: string
    phoneNumbers?: Array<APISchemas["PhoneNumberDto"]>
    privileged?: boolean
    title?: "MISTER" | "MISS"
  }
  PhoneNumberDto: {
    favorite?: boolean
    number?: string
    source?: "FISCAL" | "DIRECTORY" | "INTERVIEWER"
  }
  ReferentDto: {
    firstName?: string
    lastName?: string
    phoneNumber?: string
    role?: string
  }
  SampleIdentifiersDto: {
    autre?: string
    /* Format: int32 */
    bs?: number
    ec?: string
    /* Format: int32 */
    le?: number
    nograp?: string
    /* Format: int32 */
    noi?: number
    /* Format: int32 */
    nole?: number
    /* Format: int32 */
    nolog?: number
    /* Format: int32 */
    numfa?: number
    /* Format: int32 */
    rges?: number
    /* Format: int32 */
    ssech?: number
  }
  StateCountCampaignDto: {
    france?: APISchemas["StateCountDto"]
    organizationUnits?: Array<APISchemas["StateCountDto"]>
  }
  StateCountDto: {
    /* Format: int64 */
    anvCount?: number
    /* Format: int64 */
    aocCount?: number
    /* Format: int64 */
    apsCount?: number
    campaign?: APISchemas["CampaignDto"]
    /* Format: int64 */
    cloCount?: number
    /* Format: int64 */
    finCount?: number
    idDem?: string
    /* Format: int64 */
    insCount?: number
    interviewer?: APISchemas["InterviewerContextDto"]
    labelDem?: string
    /* Format: int64 */
    nnsCount?: number
    /* Format: int64 */
    npaCount?: number
    /* Format: int64 */
    npiCount?: number
    /* Format: int64 */
    npxCount?: number
    /* Format: int64 */
    nvaCount?: number
    /* Format: int64 */
    nvmCount?: number
    /* Format: int64 */
    prcCount?: number
    /* Format: int64 */
    rowCount?: number
    /* Format: int64 */
    tbrCount?: number
    /* Format: int64 */
    total?: number
    /* Format: int64 */
    vicCount?: number
    /* Format: int64 */
    vinCount?: number
    /* Format: int64 */
    wfsCount?: number
    /* Format: int64 */
    wftCount?: number
  }
  StateDto: {
    /* Format: int64 */
    date?: number
    /* Format: int64 */
    id?: number
    type?:
      | "NVM"
      | "NNS"
      | "ANV"
      | "VIN"
      | "VIC"
      | "PRC"
      | "AOC"
      | "APS"
      | "INS"
      | "WFT"
      | "WFS"
      | "TBR"
      | "FIN"
      | "CLO"
      | "NVA"
  }
  SurveyUnitCampaignDto: {
    campaign?: string
    city?: string
    closingCause?: "NPA" | "NPI" | "NPX" | "ROW"
    comments?: Array<APISchemas["CommentDto"]>
    contactOutcome?: APISchemas["ContactOutcomeDto"]
    /* Format: int64 */
    finalizationDate?: number
    id?: string
    identificationState?: string
    interviewer?: APISchemas["InterviewerDto"]
    location?: string
    questionnaireState?: string
    reading?: boolean
    /* Format: int32 */
    ssech?: number
    state?:
      | "NVM"
      | "NNS"
      | "ANV"
      | "VIN"
      | "VIC"
      | "PRC"
      | "AOC"
      | "APS"
      | "INS"
      | "WFT"
      | "WFS"
      | "TBR"
      | "FIN"
      | "CLO"
      | "NVA"
    viewed?: boolean
  }
  SurveyUnitContextDto: {
    address?: APISchemas["AddressDto"]
    campaign?: string
    closingCause?: APISchemas["ClosingCauseDto"]
    comments?: Array<APISchemas["CommentDto"]>
    contactAttempts?: Array<APISchemas["ContactAttemptDto"]>
    contactOutcome?: APISchemas["ContactOutcomeDto"]
    id?: string
    identification?: APISchemas["IdentificationDto"]
    organizationUnitId?: string
    persons?: Array<APISchemas["PersonDto"]>
    priority?: boolean
    sampleIdentifiers?: APISchemas["SampleIdentifiersDto"]
    states?: Array<APISchemas["StateDto"]>
  }
  SurveyUnitDetailDto: {
    address?: APISchemas["AddressDto"]
    campaign?: string
    comments?: Array<APISchemas["CommentDto"]>
    communicationRequests?: Array<APISchemas["CommunicationRequestDto"]>
    contactAttempts?: Array<APISchemas["ContactAttemptDto"]>
    contactOutcome?: APISchemas["ContactOutcomeDto"]
    id?: string
    identification?: APISchemas["IdentificationDto"]
    move?: boolean
    persons?: Array<APISchemas["PersonDto"]>
    priority?: boolean
    sampleIdentifiers?: APISchemas["SampleIdentifiersDto"]
    states?: Array<APISchemas["StateDto"]>
  }
  SurveyUnitDto: {
    address?: APISchemas["AddressDto"]
    campaign?: string
    campaignLabel?: string
    /* Format: int64 */
    collectionEndDate?: number
    /* Format: int64 */
    collectionStartDate?: number
    communicationRequestConfiguration?: boolean
    contactAttemptConfiguration?: "F2F" | "TEL"
    contactOutcomeConfiguration?: "F2F" | "TEL"
    /* Format: int64 */
    endDate?: number
    id?: string
    identificationConfiguration?: "IASCO" | "NOIDENT"
    /* Format: int64 */
    identificationPhaseStartDate?: number
    /* Format: int64 */
    interviewerStartDate?: number
    /* Format: int64 */
    managementStartDate?: number
    persons?: Array<APISchemas["PersonDto"]>
  }
  SurveyUnitInterviewerLinkDto: {
    interviewerId?: string
    surveyUnitId?: string
  }
  SurveyUnitStatesDto: { id?: string; states?: Array<APISchemas["StateDto"]> }
  UserContextDto: {
    firstName?: string
    id?: string
    lastName?: string
    localOrganizationUnits?: Array<APISchemas["OrganizationUnitDto"]>
    organizationUnit?: APISchemas["OrganizationUnitDto"]
  }
  UserDto: {
    firstName?: string
    id?: string
    lastName?: string
    localOrganizationUnits?: Array<APISchemas["OrganizationUnitDto"]>
    organizationUnit?: APISchemas["OrganizationUnitDto"]
  }
  VerifyNameResponseDto: { id?: string; label?: string; type?: string }
  VisibilityContextDto: {
    /* Format: int64 */
    collectionEndDate?: number
    /* Format: int64 */
    collectionStartDate?: number
    /* Format: int64 */
    endDate?: number
    /* Format: int64 */
    identificationPhaseStartDate?: number
    /* Format: int64 */
    interviewerStartDate?: number
    /* Format: int64 */
    managementStartDate?: number
    organizationalUnit?: string
  }
  VisibilityDto: {
    /* Format: int64 */
    collectionEndDate?: number
    /* Format: int64 */
    collectionStartDate?: number
    /* Format: int64 */
    endDate?: number
    /* Format: int64 */
    identificationPhaseStartDate?: number
    /* Format: int64 */
    interviewerStartDate?: number
    /* Format: int64 */
    managementStartDate?: number
  }
  WsText: { text?: string }
}

export type APIEndpoints = {
  "/": { responses: { get: string }; requests: { method?: "get" } }
  "/api/admin/campaign/{id}/survey-units": {
    responses: { get: Array<string> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/admin/campaigns": {
    responses: { get: Array<APISchemas["CampaignDto"]> }
    requests: { method?: "get" }
  }
  "/api/admin/interviewers": {
    responses: { get: Array<APISchemas["InterviewerContextDto"]> }
    requests: { method?: "get" }
  }
  "/api/admin/survey-units": {
    responses: { get: Array<string> }
    requests: { method?: "get" }
  }
  "/api/campaign": {
    responses: { post: {} }
    requests: { method: "post"; body: APISchemas["CampaignContextDto"] }
  }
  "/api/campaign/{idCampaign}/organizational-unit/{idOu}/visibility": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: { idCampaign: string; idOu: string }
      body: APISchemas["VisibilityDto"]
    }
  }
  "/api/campaign/{id}": {
    responses: { get: APISchemas["CampaignContextDto"]; put: {}; delete: {} }
    requests:
      | { method?: "get"; urlParams: { id: string } }
      | {
          method: "put"
          urlParams: { id: string }
          body: APISchemas["CampaignContextDto"]
        }
      | {
          method: "delete"
          query?: { force?: boolean }
          urlParams: { id: string }
        }
  }
  "/api/campaign/{id}/interviewers": {
    responses: { get: Array<APISchemas["InterviewerDto"]> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/campaign/{id}/survey-units": {
    responses: { get: Array<APISchemas["SurveyUnitCampaignDto"]> }
    requests: {
      method?: "get"
      query?: { state?: string }
      urlParams: { id: string }
    }
  }
  "/api/campaign/{id}/survey-units/abandoned": {
    responses: { get: APISchemas["CountDto"] }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/campaign/{id}/survey-units/contact-outcomes": {
    responses: { get: APISchemas["ContactOutcomeTypeCountCampaignDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string }
    }
  }
  "/api/campaign/{id}/survey-units/interviewer/{idep}/closing-causes": {
    responses: { get: APISchemas["ClosingCauseCountDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string; idep: string }
    }
  }
  "/api/campaign/{id}/survey-units/interviewer/{idep}/contact-outcomes": {
    responses: { get: APISchemas["ContactOutcomeTypeCountDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string; idep: string }
    }
  }
  "/api/campaign/{id}/survey-units/interviewer/{idep}/state-count": {
    responses: { get: APISchemas["StateCountDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string; idep: string }
    }
  }
  "/api/campaign/{id}/survey-units/not-attributed": {
    responses: { get: APISchemas["CountDto"] }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/campaign/{id}/survey-units/not-attributed/contact-outcomes": {
    responses: { get: APISchemas["ContactOutcomeTypeCountDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string }
    }
  }
  "/api/campaign/{id}/survey-units/not-attributed/state-count": {
    responses: { get: APISchemas["StateCountDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string }
    }
  }
  "/api/campaign/{id}/survey-units/state-count": {
    responses: { get: APISchemas["StateCountCampaignDto"] }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
      urlParams: { id: string }
    }
  }
  "/api/campaign/{id}/visibilities": {
    responses: { get: Array<APISchemas["VisibilityContextDto"]> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/campaigns": {
    responses: { get: Array<APISchemas["CampaignDto"]> }
    requests: { method?: "get" }
  }
  "/api/campaigns/survey-units/contact-outcomes": {
    responses: { get: Array<APISchemas["ContactOutcomeTypeCountDto"]> }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
    }
  }
  "/api/campaigns/survey-units/state-count": {
    responses: { get: Array<APISchemas["StateCountDto"]> }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
    }
  }
  "/api/campaigns/{id}/referents": {
    responses: { get: Array<APISchemas["ReferentDto"]> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/check-habilitation": {
    responses: { get: APISchemas["HabilitationDto"] }
    requests: { method?: "get"; query: { id: string; role?: string } }
  }
  "/api/create-dataset": {
    responses: { post: {} }
    requests: { method: "post" }
  }
  "/api/delete-dataset": {
    responses: { delete: {} }
    requests: { method: "delete" }
  }
  "/api/enum/contact-attempt": {
    responses: {
      get: Array<
        | "INA"
        | "APT"
        | "REF"
        | "TUN"
        | "NOC"
        | "MES"
        | "UCD"
        | "NLH"
        | "NPS"
        | "PUN"
      >
    }
    requests: { method?: "get" }
  }
  "/api/enum/contact-outcome": {
    responses: {
      get: Array<
        | "INA"
        | "REF"
        | "IMP"
        | "UCD"
        | "UTR"
        | "ALA"
        | "DUK"
        | "DUU"
        | "DCD"
        | "NUH"
        | "NOA"
      >
    }
    requests: { method?: "get" }
  }
  "/api/enum/state": {
    responses: {
      get: Array<
        | "NVM"
        | "NNS"
        | "ANV"
        | "VIN"
        | "VIC"
        | "PRC"
        | "AOC"
        | "APS"
        | "INS"
        | "WFT"
        | "WFS"
        | "TBR"
        | "FIN"
        | "CLO"
        | "NVA"
      >
    }
    requests: { method?: "get" }
  }
  "/api/healthcheck": { responses: { get: {} }; requests: { method?: "get" } }
  "/api/interviewer/campaigns": {
    responses: { get: Array<APISchemas["CampaignDto"]> }
    requests: { method?: "get" }
  }
  "/api/interviewer/{id}": {
    responses: {
      get: APISchemas["InterviewerContextDto"]
      put: APISchemas["InterviewerContextDto"]
      delete: {}
    }
    requests:
      | { method?: "get"; urlParams: { id: string } }
      | {
          method: "put"
          urlParams: { id: string }
          body: APISchemas["InterviewerContextDto"]
        }
      | { method: "delete"; urlParams: { id: string } }
  }
  "/api/interviewer/{id}/campaigns": {
    responses: { get: Array<APISchemas["CampaignDto"]> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/interviewers": {
    responses: { get: Array<APISchemas["InterviewerDto"]>; post: string }
    requests:
      | { method?: "get" }
      | { method: "post"; body: Array<APISchemas["InterviewerContextDto"]> }
  }
  "/api/interviewers/survey-units/state-count": {
    responses: { get: Array<APISchemas["StateCountDto"]> }
    requests: {
      method?: "get"
      query?: {
        /* Format: int64 */
        date?: number
      }
    }
  }
  "/api/mail": {
    responses: { post: {} }
    requests: { method: "post"; body: APISchemas["MailDto"] }
  }
  "/api/message": {
    responses: { post: {} }
    requests: { method: "post"; body: APISchemas["MessageDto"] }
  }
  "/api/message-history": {
    responses: { get: Array<APISchemas["MessageDto"]> }
    requests: { method?: "get" }
  }
  "/api/message/{id}/interviewer/{idep}/delete": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: {
        /* Format: int64 */
        id: number
        idep: string
      }
    }
  }
  "/api/message/{id}/interviewer/{idep}/read": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: {
        /* Format: int64 */
        id: number
        idep: string
      }
    }
  }
  "/api/messages/{id}": {
    responses: { get: Array<APISchemas["MessageDto"]> }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/organization-unit": {
    responses: { post: {} }
    requests: { method: "post"; body: APISchemas["OrganizationUnitContextDto"] }
  }
  "/api/organization-unit/{id}": {
    responses: { delete: {} }
    requests: { method: "delete"; urlParams: { id: string } }
  }
  "/api/organization-unit/{id}/users": {
    responses: { post: {} }
    requests: {
      method: "post"
      urlParams: { id: string }
      body: Array<APISchemas["UserContextDto"]>
    }
  }
  "/api/organization-units": {
    responses: {
      get: Array<APISchemas["OrganizationUnitContextDto"]>
      post: {}
    }
    requests:
      | { method?: "get" }
      | {
          method: "post"
          body: Array<APISchemas["OrganizationUnitContextDto"]>
        }
  }
  "/api/preferences": {
    responses: { put: {} }
    requests: { method: "put"; body: Array<string> }
  }
  "/api/survey-unit/{id}": {
    responses: {
      get: APISchemas["SurveyUnitDetailDto"]
      put: APISchemas["SurveyUnitDetailDto"]
      delete: {}
    }
    requests:
      | { method?: "get"; urlParams: { id: string } }
      | {
          method: "put"
          urlParams: { id: string }
          body: APISchemas["SurveyUnitDetailDto"]
        }
      | { method: "delete"; urlParams: { id: string } }
  }
  "/api/survey-unit/{id}/close/{closingCause}": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: { closingCause: "NPA" | "NPI" | "NPX" | "ROW"; id: string }
    }
  }
  "/api/survey-unit/{id}/closing-cause/{closingCause}": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: { closingCause: "NPA" | "NPI" | "NPX" | "ROW"; id: string }
    }
  }
  "/api/survey-unit/{id}/comment": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: { id: string }
      body: APISchemas["CommentDto"]
    }
  }
  "/api/survey-unit/{id}/state/{state}": {
    responses: { put: {} }
    requests: {
      method: "put"
      urlParams: {
        id: string
        state:
          | "NVM"
          | "NNS"
          | "ANV"
          | "VIN"
          | "VIC"
          | "PRC"
          | "AOC"
          | "APS"
          | "INS"
          | "WFT"
          | "WFS"
          | "TBR"
          | "FIN"
          | "CLO"
          | "NVA"
      }
    }
  }
  "/api/survey-unit/{id}/states": {
    responses: { get: APISchemas["SurveyUnitStatesDto"] }
    requests: { method?: "get"; urlParams: { id: string } }
  }
  "/api/survey-unit/{id}/temp-zone": {
    responses: { post: {} }
    requests: {
      method: "post"
      urlParams: { id: string }
      body: APISchemas["JsonNode"]
    }
  }
  "/api/survey-unit/{id}/viewed": {
    responses: { put: {} }
    requests: { method: "put"; urlParams: { id: string } }
  }
  "/api/survey-units": {
    responses: { get: Array<APISchemas["SurveyUnitDto"]>; post: {} }
    requests:
      | { method?: "get"; query?: { extended?: boolean } }
      | { method: "post"; body: Array<APISchemas["SurveyUnitContextDto"]> }
  }
  "/api/survey-units/closable": {
    responses: { get: Array<APISchemas["SurveyUnitCampaignDto"]> }
    requests: { method?: "get" }
  }
  "/api/survey-units/interviewers": {
    responses: { post: {} }
    requests: {
      method: "post"
      body: Array<APISchemas["SurveyUnitInterviewerLinkDto"]>
    }
  }
  "/api/survey-units/temp-zone": {
    responses: { get: {} }
    requests: { method?: "get" }
  }
  "/api/user": {
    responses: { get: APISchemas["UserDto"]; post: {} }
    requests:
      | { method?: "get" }
      | { method: "post"; body: APISchemas["UserDto"] }
  }
  "/api/user/{id}": {
    responses: { get: APISchemas["UserDto"]; put: {}; delete: {} }
    requests:
      | { method?: "get"; urlParams: { id: string } }
      | {
          method: "put"
          urlParams: { id: string }
          body: APISchemas["UserDto"]
        }
      | { method: "delete"; urlParams: { id: string } }
  }
  "/api/user/{userId}/organization-unit/{ouId}": {
    responses: { put: {} }
    requests: { method: "put"; urlParams: { ouId: string; userId: string } }
  }
  "/api/verify-name": {
    responses: { post: {} }
    requests: { method: "post"; body: APISchemas["WsText"] }
  }
  "/campaigns/{id}/ongoing": {
    responses: { get: APISchemas["OngoingDto"] }
    requests: { method?: "get"; urlParams: { id: string } }
  }
}

export type APIPaths = keyof APIEndpoints

export type APIRequests<T extends APIPaths> = APIEndpoints[T]["requests"]

export type APIMethods<T extends APIPaths> = NonNullable<
  APIRequests<T>["method"]
>

export type APIRequest<T extends APIPaths, M extends APIMethods<T>> = Omit<
  {
    [MM in APIMethods<T>]: APIRequests<T> & { method: MM }
  }[M],
  "method"
> & { method?: M }

type DefaultToGet<T extends string | undefined> = T extends string ? T : "get"

export type APIResponse<T extends APIPaths, M extends string | undefined> =
  DefaultToGet<M> extends keyof APIEndpoints[T]["responses"]
    ? APIEndpoints[T]["responses"][DefaultToGet<M>]
    : never
