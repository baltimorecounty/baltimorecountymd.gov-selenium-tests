const dateParse = require('date-fns/parse');
const isDateEqual = require('date-fns/is_equal');
const startOfDay = require('date-fns/start_of_day');
const webdriver = require('selenium-webdriver');
const statuses = require('./constants').statuses;
const seleniumProxy = require('../../selenium-proxy');
const By = webdriver.By;
const firstCollapsedButtonIndex = 0;

const helpers = (state) => {
	/**
	 * Private Methods
	 */
	const isPanelOpen = async (elm) => {
		try {
			const openPanel = await elm.findElement(By.css(state.options.panelIsOpen));
			return !!openPanel;
		}
		catch (ex) {
			return false;
		}
	};

	const checkNavPanelStatus = async (initialStatus, targetButtonToClickSelector) => {
		const collapsedButtons = await state.driver.findElements(By.css(targetButtonToClickSelector));
		if (collapsedButtons && collapsedButtons.length) {
			const collapsedButton = collapsedButtons[firstCollapsedButtonIndex];
			const collapsedButtonParent = await collapsedButton.findElement(By.xpath("..")); //https://stackoverflow.com/a/18001659/1143670
			const isNavPanelOpen = await isPanelOpen(collapsedButtonParent);
			const isExpandedAndOpen = initialStatus === statuses.EXPANDED && isNavPanelOpen;
			const isCollapsedAndClosed = initialStatus === statuses.COLLAPSED && !isNavPanelOpen;
			
			if (isExpandedAndOpen || isCollapsedAndClosed) {
				await collapsedButton.click();
				state.driver.sleep(1000); //Give the ui a second to update
				const isPanelExpanded = await isPanelOpen(collapsedButtonParent);

				return initialStatus === statuses.EXPANDED ? !isPanelExpanded : isPanelExpanded;
			}
		}
		return false;
	}

	/**
	 * Public Methods
	 */
	const isActivePageHighlighted = async () => {
		try {
			const activePageNavItem = await state.driver.findElement(By.css(state.options.activePageNavItem));
			return !!activePageNavItem;
		}
		catch (ex) {
			return false;
		}
	};

	const doesNavCollapse = async () => {
		return await checkNavPanelStatus(statuses.EXPANDED, state.options.collapseButtonSelector);
	};

	const doesNavExpand = async () => {
		return await checkNavPanelStatus(statuses.COLLAPSED, state.options.expandButtonSelector);
	};

	const doesNavShowRightCaretWhenCollapsed = async () => {
		const expandButton = await state.driver.findElements(By.css(state.options.expandButtonSelector));
		if (expandButton && expandButton.length) {
			const expandButtonClasses = await expandButton[firstCollapsedButtonIndex].getAttribute('class');
			return expandButtonClasses.toLowerCase().indexOf("active") === -1;
		}
		return false;
	};

	const doesNavShowDownCaretWhenExpanded = async () => {
		const expandButton = await state.driver.findElements(By.css(state.options.expandButtonSelector));
		if (expandButton && expandButton.length) {
			const expandButtonElm = expandButton[firstCollapsedButtonIndex];
			let expandButtonClasses = await expandButtonElm.getAttribute('class');
			let isExpanded = expandButtonClasses.toLowerCase().indexOf("active") > -1;

			if (!isExpanded) {
				await expandButtonElm.click();
				expandButtonClasses = await expandButtonElm.getAttribute('class');
				isExpanded = expandButtonClasses.toLowerCase().indexOf("active") > -1;
				return isExpanded;
			}
		}
		return false;
	};

	/**
	 * Export public methods
	 */
	return {
		isActivePageHighlighted,
		doesNavCollapse,
		doesNavExpand,
		doesNavShowRightCaretWhenCollapsed,
		doesNavShowDownCaretWhenExpanded,
	};
};

const NavListAutomater = (options) => {
	const state = {
		options,
	};

	return Object.assign(
		{},
		seleniumProxy(state),
		helpers(state),
	);
};

module.exports = NavListAutomater;
