import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    public endPoint = '';

    constructor(private httpClient: HttpClient) {
    }

    postFile(fileUpload: File): Observable<boolean> {
        const formData: FormData = new FormData();
        formData.append('fileKey', fileUpload, fileUpload.name);
        return this.httpClient.post(this.endPoint, formData)
            .pipe(map(() => true));
    }

}
