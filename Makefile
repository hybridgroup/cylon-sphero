export PATH := node_modules/.bin:$(PATH)

# Our 'phony' make targets (don't involve any file changes)
.PHONY: test bdd

# Run Mocha, with standard reporter.
test:
	mocha --colors test/support/globals.js test/specs/**/*.js

# Run Mocha, with more verbose BDD reporter.
bdd:
	mocha --colors -R spec test/support/globals.js test/specs/**/*.js
