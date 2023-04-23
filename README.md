# Compilador TINY a P-Code
## Compilador
El compilador está programado en JAVA y hace uso del generador léxico **JFlex** junto con el generador sintáctico **CUP**. Está diseñado de una manera sencilla para el entendimiento básico sobre los compiladores. Este compilador está basado en un compilador Tiny que genera codigo Tiny Machine (TM).

Inicialmente, el compilador base solo permitía instrucciones de suma, resta, multiplicación, división, comparación (igual a y menor que), condiciones, un ciclo básico, y lectura y escritura de valores.

Dentro de las especificaciones léxicas se encuentran:


| Palabras Reservadas    | Símbolos Especiales     | Otros                       |
| -----------------------|:-----------------------:|-----------------------------|
| if                     | +                       | Números enteros             |  
| then                   | -                       | Identificadores (variables) |
| else                   | *                       | Vectores con índices enteros|
| repeat                 | =                       |                             |
| until                  | <                       |                             |
| read                   | (                       |                             |
| write                  | )                       |                             |
| return                 | :=                      |                             |


Cada variable debe ser declarada antes de ser usada

## Máquina Virtual P-Code
Es un programa desarrollado en HTML/CSS/JavaScript que permite simular la ejecución del Código P.
Cuenta con tres estructuras de almacenamiento: una memoria de datos, una memoria de instrucciones
y una pila.

- Pila: La pila permite almacenar temporalmente datos para realizar operaciones.
- Instrucciones: Arreglo de instrucciones en código P sacadas del programa fuente a ejecutar, con sus argumentos
- Datos: Arreglo para almacenar datos.

La Maquina Virtual acepta archivos de texto en formato .txt y .pcod.

### Listado de instrucciones en código P

Listado de instrucciones que soporta actualmente la máquina virtual.

**Instrucción**|**Descripción**|**Nota**
|:-----:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
|LDA X  |Pone la dirección de X en el tope de la pila. X es la dirección de la variable.|
|LOD X  |Pone el valor de X en el tope de la pila. X es la dirección de la variable|
|LDC N  |Pone la constante N en el tope de la pila. |
|STO    |Guarda el valor del tope de la pila en la dirección de datos que se encuentra debajo del tope. Ambos valores son removidos.|
|STN    |Igual a STO, pero coloca el valor devuelta al tope de la pila. La dirección es removida.|
|STP    |Detiene la ejecución de la instrucción. Marca el fin del programa.|
|RDI    |Lee un valor de la entrada estándar. Pone el valor en la dirección de memoria que se encuentre en el tope de la pila. El tope de la pila es removido.|
|WRI    |Emite el valor que se encuentre en el tope de la pila a la salida estándar. El valor es removido de la pila.|
|ADI    |Extrae dos valores de la pila, los suma y pone el resultado en el tope de la pila. |A + B, donde B es el tope de la pila.|
|SBI    |Extrae dos valores de la pila, los resta y pone el resultado en el tope de la pila.|A – B, donde B es el tope de la pila.|
|MPI    |Extrae dos valores de la pila, los multiplica y pone el resultado en el tope de la pila.|A * B, donde B es el tope de la pila.|
|DVI    |Extrae dos valores de la pila, los divide y pone el resultado  (parte entera sin el decimal) en el tope de la pila.|A / B, donde B es el tope de la pila.|
|EQU    |Igual a. Extrae dos valores de la pila, y compara si son iguales. Coloca 0 (falso) o 1 (verdadero) en el tope de la pila.|
|GRT    |Mayor que. Extrae dos valores de la pila, y los compara. Coloca 0 (falso) o 1 (verdadero) en el tope de la pila.|A > B, donde B es el tope de la pila.|
|LAB L  |Define una etiqueta L. Marca esta instrucción como punto objetivo para un salto.|L es el número o dirección de la instrucción en la memoria de instrucciones.|
|UJP L  |Salto incondicional hacia la instrucción con etiqueta L. Coloca PC igual a L – 1.|L es el número o dirección de la instrucción en la memoria de instrucciones.|
|FJP L  |Salto condicional. Extrae el valor del tope de la fila, si es 0 (falso) salta a la instrucción con etiqueta L. Coloca PC igual a L – 1.|L es el número o dirección de la instrucción en la memoria de instrucciones.|
|IND i  |Extrae la dirección que se encuentra en el tope de la pila, y la desplaza i direcciones. Coloca el valor de la nueva dirección en el tope de la pila.|
|IXA d  |Desplaza una dirección de memoria usando un factor de escala. Toma como parámetro el factor de escala entero. Extrae del tope de la pila la cantidad a desplazar (i). La dirección se debe encontrar debajo del tope de la pila (a). Remueve de la pila tanto el desplazamiento como la dirección. Coloca en el tope de la pila la nueva dirección calculada.|D = a + (i * d). Donde D es la nueva dirección, a la dirección a desplazar, i la cantidad a desplazar, y del factor de escala.|
MST     |Mark Stack. Marca el comienzo de la declaración de los valores de los argumentos. Además, coloca el apuntador MP igual a SP, para indicar el comienzo de la pila para el procedimiento a ser llamado.|
CUP LP  |Instrucción de llamada a procedimiento. Pone en la pila el valor actual de PC, para luego ser usada como dirección de retorno. Luego salta a la instrucción LP (comienzo del procedimiento). Coloca PC igual a IF – 1.|LP es el número o dirección de la instrucción (comienzo del procedimiento) en la memoria de instrucciones.
ENT DP  |Instrucción de entrada al procedimiento. El parámetro DP es la dirección (en memoria de datos) del identificador del procedimiento. Esta instrucción extrae el tope de la pila (dirección de retorno) y luego extrae de la pila los argumentos hasta que MP sea igual a SP (final de la pila del procedimiento). Carga los valores de los argumentos en sus respectivas direcciones usando DP como dirección base. Al final vuelve a colocar en la pila la dirección de retorno para ser usada más adelante.|DP es la dirección del procedimiento en la memoria de datos.|
RET     |Instrucción de retorno del procedimiento. Extrae de la pila el valor a ser retornado, luego extrae la dirección de retorno que se encuentra al final de la pila del procedimiento (MP). Usa dicha dirección para emitir un salto a donde el procedimiento fue llamado, y coloca nuevamente el valor de retorno en el tope de la pila.| 
