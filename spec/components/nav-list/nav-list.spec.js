/* eslint-env mocha */
const chai = require('chai');
const constants = require('./constants');
const NavListAutomater = require('./nav-list.automater');

const expect = chai.expect;

let automater;

let automaterOptions = {
	activePageNavItem: '.nav-list .collapse.in a.current',
	expandButtonSelector: 'button.accordion-collapsed:not(.active)',
	collapseButtonSelector: 'button.accordion-collapsed.active',
	panelIsOpen: '.collapse.in'
};
	
describe(`Nav List Component`, () => {
	it(`Should highlight the active page in the list`, async () => {
		const isActivePageHighlighted = await automater.isActivePageHighlighted();
		expect(isActivePageHighlighted).to.be.eq(true);
	});

	it(`Should expand a collapsed nav section`, async () => {
		const didExpand = await automater.doesNavExpand();
		expect(didExpand).to.be.eq(true);
	});

	it(`Should collapse an expanded nav section`, async () => {
		const didCollapse = await automater.doesNavCollapse();
		expect(didCollapse).to.be.eq(true);
	});

	// it(`Should display an caret that points down when the nav section is expanded`, async () => {
	// 	const isCaretPointingDown = true;
	// 	expect(isCaretPointingDown).to.be.eq(true);
	// });

	// it(`Should display an caret that points to the right when the nav section is collapsed`, async () => {
	// 	const isCaretPointingRight = true;
	// 	expect(isCaretPointingRight).to.be.eq(true);
	// });

	before(() => {
		automater = NavListAutomater(automaterOptions);
	});

	beforeEach(() => {
		automater.get(constants.url);
	});

	after(() => {
		automater.teardown();
	});
});

function handleFailure(msg, ex) {
	expect.fail(0, 1, msg + `\n\n${ex}`);
}

function handleException(err, done) {
	console.log(err); // eslint-disable-line no-console
	const errName = err.name || null;
	expect(errName).to.equal(null);
	done();
}
