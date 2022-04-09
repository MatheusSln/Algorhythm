export class LocalStorageUtils {
    
    public getUser() {
        return JSON.parse(localStorage.getItem('algorhythm.user'));
    }

    public saveLocalDataUser(response: any) {
        if (response != undefined){
            this.saveTokenUser(response.accessToken);
            this.saveUser(response.userToken);
        }else{
            this.cleanLocalDataUser();
        }

    }

    public cleanLocalDataUser() {
        localStorage.removeItem('algorhythm.token');
        localStorage.removeItem('algorhythm.user');
    }

    public getTokenUser(): string {
        return localStorage.getItem('algorhythm.token');
    }

    public saveTokenUser(token: string) {
        localStorage.setItem('algorhythm.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('algorhythm.user', JSON.stringify(user));
    }

}