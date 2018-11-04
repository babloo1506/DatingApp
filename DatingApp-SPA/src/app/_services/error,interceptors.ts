import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class ErrorInterceptors implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError('Unauthorize');
                    }

                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }

                    const serverError = error.error;
                    let modelStateErrors = '';

                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateErrors || serverError || 'Server error');
                }
            })

        );
    }
}


export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptors,
  multi: true
};
