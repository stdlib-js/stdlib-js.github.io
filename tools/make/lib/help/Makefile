
# VARIABLES #

# Define the path to the Makefile usage text file for displaying help information:
MAKE_USAGE ?= $(TOOLS_MAKE_DIR)/usage.txt

# Define command flags:
FIND_MAKEFILES_FLAGS ?= \
	-name 'Makefile' \
	-o \
	-name '*.mk'


# TARGETS #

# Print Makefile help.
#
# This target prints a help message and lists available targets.

help:
	$(QUIET) $(CAT) $(MAKE_USAGE)

.PHONY: help


# List Makefile targets.
#
# This target lists all Makefile targets.
#
# Note: the list of targets is NOT exhaustive, as it does not include targets which have not been explicitly declared PHONY targets and does not include targets declared via variables. These targets could be included by dumping the Makefile database `make -qp`, but not seen as necessary due to predominant use of PHONY.

list-targets:
	$(QUIET) find $(TOOLS_MAKE_DIR) $(FIND_MAKEFILES_FLAGS) \
	| xargs grep '^.PHONY: ' \
	| awk '{print $$2}' \
	| sort

.PHONY: list-targets
