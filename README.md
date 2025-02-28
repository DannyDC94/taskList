# ATOM FE CHALLENGE TEMPLATE - ANGULAR

## Comentarios sobre el desarrollo

Aplicacion implemnetada con una arquitectura en capas o modular 

Esta arquitectura tiene las siguientes caracteristicas:

Separación de responsabilidades: Cada módulo o carpeta tiene una responsabilidad clara y definida.
Modularidad: La aplicación se divide en módulos independientes que pueden desarrollarse y probarse de forma aislada.
Escalabilidad: Permite que la aplicación crezca de manera controlada sin perder la organización.
Reutilización: Promueve la creación de componentes y servicios reutilizables.

Entre las capas principales se tiene
- CORE: Contiene servicios singleton, guards y otros elementos que deben existir como instancia única en la aplicación.
- MODULES: Organiza la aplicación en módulos funcionales o características, cada uno con sus propia funcionalidad.
- SHARED: Contiene componentes, directivas y pipes que se reutilizan en múltiples partes de la aplicación.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Node version 22.12.0

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
