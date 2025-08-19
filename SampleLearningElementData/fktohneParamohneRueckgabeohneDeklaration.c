#include <stdio.h>

/* Deklaration der Funktion ausgabe */
void ausgabe();

/* Definition der Funktion main*/
int main()
{
	printf("Vor dem Aufruf der Funktion ausgabe()\n");
	ausgabe( ); /* Aufruf der Funktion Ausgabe */
	printf("Nach dem Aufruf der Funktion ausgabe()\n");
	return(0); /* Wertrueckgabe aus einer Funktion */
}

/* Definition der Funktion ausgabe */
void ausgabe()
{
	printf("Funktion ausgabe() wird aufgerufen\n");
}

/* Definiton der Funktion eineEwigLangerNameFuerEineFunktionDieNichtAufgerufenWirdWeilSieNichtRelevantIst */
void eineEwigLangerNameFuerEineFunktionDieNichtAufgerufenWirdWeilSieNichtRelevantIst() {};