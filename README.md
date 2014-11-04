vsproject
=========

Tool for manipulating Visual Studio projects

Creates a new project file with linked references to a source project. 

Examples of use:
- simplify making alternate platform versions
- prototyping project reorganization

## Usage

````
node index.js c:\code\src\project1\source.csproj c:\code\src\project2\dest.csproj (-f "filterregex") (-e "excluderegex") (--preview)
````
  
### Options
  
````
-f          Only add files mathing regex to the destination project
-e          Excludes files matching regex from the destination project
--preview   Does not save file, but outputs results to console
````
