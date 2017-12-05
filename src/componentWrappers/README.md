# Wrappers for reusable components

These wrappers are an intermediary between the reusable components and the application.
The purpose is to have a layer for injecting internationalization (and possibly other things) in the components,
for the things that will always be the same in the application, but different by language.
( e.g. in the listWrapper, the 'Clear' button will always be 'Clear' in english, but the label should be different in other languages)
