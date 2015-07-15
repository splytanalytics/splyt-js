The `splyt-default/` folder contains a modified version of the default template
that ships with JSDoc 3.2.2.

The only modification is to `tmpl/details.tmpl`.  That template includes the
file and line number for each documented code element.  This was always getting
emitted into the generated documentation, even when 
`templates.default.outputSourceFiles` was set to false.

We didn't want our generated documentation to have references to the Javascript
source, so this file was modified to stop emitting file/line number references.
A copy of the original template appears in `default.tmpl.original` if you wish to
compare and review this modification.

Andrew Brown
April 25, 2014
