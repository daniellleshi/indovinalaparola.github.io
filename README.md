Web application moderna, responsive e ben rifinita, ispirata al gioco “Intesa Vincente” del programma “Reazione a Catena”.

FUNZIONALITÀ PRINCIPALI:
Gioco a squadre: due squadre, ciascuna composta da tre giocatori.

Ogni squadra ha:

Due "Giocatori" (che suggeriscono le parole alternativamente).

Un "Indovinatore", che deve indovinare la parola target proposta dal sistema.

Round di gioco a turno: una squadra completa il suo turno prima che inizi quello dell’altra.

MECCANICHE DI GIOCO:
Il sistema mostra una parola target generata casualmente da un API/servizio online di parole casuali.

I due giocatori si alternano nel dire una parola ciascuno per suggerire.

L'indovinatore vede solo l'interfaccia di indovinamento (sincronizzata).

Il sistema registra se la parola è:

Indovinata (✓)

Saltata (→)

Sbagliata (✗, solo in modalità difficile con penalità -1 punto)

Ogni turno ha un timer configurabile (30, 60, 90 secondi o personalizzabile).

Il numero massimo di passi è configurabile (3, 5, 10, infiniti).

I passaggi sono bloccati al raggiungimento del limite.

MODALITÀ DI GIOCO:
Facile: senza penalità.

Difficile: -1 punto se la parola viene indovinata erroneamente.

MULTIDISPOSITIVO E STANZE:
Supporta l’uso multi-dispositivo tramite un sistema di “stanze” con codice generato automaticamente.

Il "Giocatore" crea la stanza e invita l'"Indovinatore" tramite codice.

L'interfaccia dell’"Indovinatore" è sincronizzata in tempo reale (tempo, passi, punteggio).

Deve avere pulsanti per "Stop" (se ha indovinato) e "Passa" (se vuole saltare).

INTERFACCIA E NAVIGAZIONE:
Pagina di benvenuto con:

Logo (usato anche come favicon).

Spiegazione dettagliata delle regole del gioco.

Pulsante per iniziare la configurazione della partita.

Pagina di configurazione:

Selezione modalità di difficoltà.

Selezione numero massimo di passi.

Inserimento nomi dei giocatori (divisi per squadra).

Selezione del ruolo: ogni utente sceglie se è "Giocatore" o "Indovinatore".

Navigazione completa: possibilità di tornare al menù principale o alle schermate precedenti in qualsiasi momento.

FINE PARTITA:
Il sistema calcola il punteggio di ciascuna squadra.

In caso di parità, vince la squadra con meno passi totali usati.

Mostrare un’animazione finale con emoji di vittoria della squadra vincente.

Se desideri, posso anche aiutarti a convertire questo prompt in un file JSON per builder automatici o a scrivere direttamente il backend/frontend in codice (React, Bolt, Firebase, ecc.). Fammi sapere!








Hai detto:
vorrei che si potessero collegare due indovinatori alla partita e vorrei che non vedessero la parolla da indovinare e che avessero l'opzione tramite pulsante di fermare il tempo quando vogliono indovinare o passare la parola


ChatGPT ha detto:
Perfetto! Ecco il prompt aggiornato che include esplicitamente:

Due indovinatori per partita, ognuno collegato tramite codice stanza.

Sincronizzazione del tempo, passi e punteggio tra dispositivi.

Interfaccia dell’indovinatore senza visualizzazione della parola target.

Pulsanti “Stop” e “Passa” visibili solo all’indovinatore.

Nessuna alternanza automatica tra squadre: una squadra gioca per intero il proprio round.

 Prompt completo per generatore di web app
Crea una web application moderna, responsive e ben rifinita, ispirata al gioco “Intesa Vincente” del programma TV “Reazione a Catena”.

 Struttura del gioco:
Due squadre, ciascuna composta da tre giocatori.

Ogni squadra ha:

2 "Giocatori": suggeriscono alternativamente una parola per aiutare.

1 "Indovinatore": cerca di indovinare la parola target proposta dal sistema.

L’app deve supportare due "Indovinatori" per squadra, collegati tramite dispositivo separato (es. smartphone/tablet), ma solo uno attivo per turno.

 Meccaniche di gioco:
Il sistema mostra una parola target a ogni turno (generata da un servizio online).

Solo i due giocatori vedono la parola target.

L’indovinatore non vede la parola e ha solo un’interfaccia con due pulsanti:

"Stop": indica che vuole dare la risposta → il tempo si ferma.

"Passa": indica che vuole saltare la parola → viene registrata come “passata” e il gioco continua.

Quando si ferma il tempo, il sistema chiede ai giocatori se la risposta è corretta o sbagliata, in base a ciò che ha detto l'indovinatore.

Il sistema registra ogni parola come:

 Indovinata

 Sbagliata (solo in modalità difficile → penalità -1 punto)

➡ Passata

Il numero di passi è limitato (es. 3, 5, 10 o infinito).

Timer per squadra: configurabile (30, 60, 90 secondi o personalizzato).

Le squadre giocano una per volta (non si alternano a ogni parola).

 Connessione multi-dispositivo e "stanze":
La web app deve usare un sistema di "stanze": chi crea la partita riceve un codice univoco da condividere.

Gli indovinatori si collegano alla partita inserendo questo codice.

Le interfacce dei dispositivi devono essere sincronizzate in tempo reale:

Tempo rimanente

Numero di passi usati

Stato della parola corrente

Ogni indovinatore ha:

Nessuna visibilità della parola

Pulsante "Stop"

Pulsante "Passa"

 Modalità di difficoltà:
Facile: nessuna penalità per errori.

Difficile: -1 punto per ogni parola indovinata erroneamente.

 Interfaccia e navigazione:
Pagina di benvenuto con:

Logo (usato anche come favicon)

Spiegazione chiara delle regole di gioco

Pulsante per avviare una nuova partita o unirsi a una stanza

Pagina di configurazione:

Selezione del livello di difficoltà

Numero massimo di passi

Timer per squadra

Inserimento dei nomi dei giocatori

Scelta del ruolo: Giocatore o Indovinatore

Navigazione completa:

Torna alla schermata precedente

Torna al menù principale

 Fine partita:
Il sistema calcola i punti totali di ogni squadra.

In caso di parità, vince la squadra con meno passi totali.

Mostrare una schermata di vittoria con emoji animata per la squadra vincente.
