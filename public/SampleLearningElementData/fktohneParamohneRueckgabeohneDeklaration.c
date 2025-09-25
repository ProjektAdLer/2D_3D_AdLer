/*
 * Demo C-Datei für AdLer Learning Elements
 * Diese Datei zeigt eine einfache C-Funktion ohne Parameter und Rückgabewert
 */

#include <stdio.h>

// Funktion ohne Parameter und ohne Rückgabewert (void)
void sayHello() {
    printf("Hallo aus dem AdLer Learning Element!\n");
    printf("Dies ist eine einfache C-Funktion.\n");
    printf("Sie hat keine Parameter und keinen Rückgabewert.\n");
}

int main() {
    printf("--- AdLer Demo Programm ---\n");
    
    // Aufruf der Funktion ohne Parameter
    sayHello();
    
    printf("Programm beendet.\n");
    return 0;
}