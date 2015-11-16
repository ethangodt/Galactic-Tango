// app lives in the global namespace.  All other client side code is written as an extension of the app variable.
// This allows us to keep other variables and functions out of the global namespace.  Any other extensions or libraries
// included in the future do not run the risk of colliding with our names.
window.app = {};