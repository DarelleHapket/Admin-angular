import {
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/utils/loading.service';
import { ToastService } from '../services/utils/toast.service';

export function httpLoaderInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    const loadingService = inject(LoadingService);
    const toastService = inject(ToastService);

    // Exclure certaines URLs si tu ne veux pas le loader partout (optionnel)
    // if (req.url.includes('/assets/') || req.url.includes('nocors')) {
    //   return next(req);
    // }

    loadingService.show();

    return next(req).pipe(
        // Intercepte la réponse successful pour vérifier success: false
        tap((event) => {
            if (event.type === 4) { // HttpEventType.Response (4 = réponse complète)
                const body = event.body as {
                    success: boolean,
                    data: any,
                    message: string,
                    status: number
                };

                // Si la réponse est un objet JSON avec success: false
                if (body && typeof body === 'object' && 'success' in body && body.success === false) {
                    const message =
                        body?.message ||
                        'Opération échouée';

                    toastService.showError(message);

                    // On throw une erreur pour que le composant puisse la catcher si besoin
                    throw new HttpErrorResponse({
                        error: body,
                        status: event.status,
                        statusText: event.statusText,
                        url: event.url || undefined,
                    });
                }
            }
        }),

        // Gestion des erreurs HTTP classiques + problèmes réseau/CORS
        catchError((error) => {
            let message = 'Une erreur est survenue';

            if (error instanceof HttpErrorResponse) {
                // Erreur réseau / pas de connexion / CORS
                if (error.error instanceof ErrorEvent || error.status === 0) {
                    message = 'Problème de connexion. Vérifiez votre réseau ou l\'accès au serveur (CORS possible).';
                }
                // Erreur HTTP classique (401, 403, 404, 500, etc.)
                else {
                    message =
                        error.error?.message ||
                        error.error?.error ||
                        error.message ||
                        `Erreur ${error.status}: ${error.statusText}`;
                }
            } else {
                // Erreur inconnue
                message = error?.message || message;
            }

            toastService.showError(message);

            // Re-throw pour que le composant appelant puisse aussi gérer l'erreur
            return throwError(() => error);
        }),

        // Toujours exécuté : succès, erreur, ou annulation
        finalize(() => {
            loadingService.hide();
        })
    );
}