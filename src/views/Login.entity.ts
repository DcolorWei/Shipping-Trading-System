//如无必要，勿增实体
type panelStatus = 'login' | 'register'

interface loginInfo {
    account: string | null;
    password: string | null;
}

interface registerInfo {
    account: string | null;
    password: string | null;
    email: string | null;
    authCode: string | null;
}


export {
    panelStatus,
    loginInfo,
    registerInfo
}