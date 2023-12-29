class AuthService {
    public createRedirectUrl(authorizeUrl: string, client_id: string, redirect_uri: string): string {
        const queryParams = new URLSearchParams({
            client_id: client_id, // todo: set clientId correctly
            scope: 'fhict fhict_personal',
            redirect_uri: redirect_uri, // todo: set redirect_uri correctly
            response_type: 'code',
        });

        return `${authorizeUrl}?${queryParams.toString()}`;
    }
}

export default AuthService;
