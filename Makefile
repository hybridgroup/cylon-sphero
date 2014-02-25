export PATH := node_modules/.bin:$(PATH)

TEST_FILES := test/support/globals.js test/specs/**/*.js

# Our 'phony' make targets (don't involve any file changes)
.PHONY: test bdd lint

# Run Mocha, with standard reporter.
test:
	mocha --colors $(TEST_FILES)

# Run Mocha, with more verbose BDD reporter.
bdd:
	mocha --colors -R spec $(TEST_FILES)

# Run JSHint
# for some reason, errors if not given the full path
lint:
	./node_modules/.bin/jshint ./lib
