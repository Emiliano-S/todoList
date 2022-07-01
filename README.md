# todoList
Challenge Develhope 24.06.2022

La challenge era la seguente:

/**
 * Dobbiamo sviluppare un sistema di gestione per una todo-list.
 *
 * La nostra base dati è rappresentata da un'API raggiungibile a link:
 * https://jsonplaceholder.typicode.com/todos che tramite una chiamata GET
 * restituisce in formato JSON tutti i dati necessari.
 *
 * Servirà una visualizzazione in tabella con le seguenti caratteristiche:
 *
 *   1. Per ogni todo-list, visualizzare l'id, il titolo e se è stata completata o meno;
 *   2. Visualizzazione di tutte le todo-list presenti a gruppi di 10, con un sistema di impaginazione;
 *   3. Sistema di ricerca per titolo da input testo, che permette di filtrare le todo-list;
 *   4. Sistema di sorting per titolo e completamento (plus: permette di ordinare per parametri multipli contemporaneamente);
 *   5. Sistema che permette di filtrare le todo-list in base allo stato di completamento;
 *   6. Richiesto anche un sistema di impaginazione, Pagine che vanno mantenute anche dopo l’applicazione del filtro. 
 *   7. Inoltre deve esserci anche un campo di ricerca e l’utente deve poter filtrare, ordinare, impaginare e cercare CONTEMPORANEAMENTE.
 *   8. Attenzione anche a non resettare i dati se ci sono filtri, ricerca, sorting o impaginazioni attive in quel momento
 *
 * Per ottenere una risposta dovremo utilizzare la libreria fetch che si occupa di gestire le chiamate ai server,
 * mantenendo un approccio che prevede l'utilizzo della sintassi async/await e in modo da non mandare in crash
 * la pagina all'errore, ma piuttosto un sistema che notifichi l'utente riguardo eventuali errori.
 *
 * Trovate tutte le informazioni riguardo l'API al link: https://jsonplaceholder.typicode.com.
 *
 * Importante ricordare che anche la grafica non deve essere trascurata, perciò fate buon uso di
 * HTML e di CSS (plus: potete usare bootstrap).
