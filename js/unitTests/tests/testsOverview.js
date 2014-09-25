test('Overview - Overview.reduce() :: Correct data reduced for overview', function () {
	base.dbUp();
	base.domUp();

	var coll = db.collection('moo')
		.setData([{
			new: false
		}, {
			new: true
		}, {
			new: false
		}, {
			new: false
		}, {
			new: false
		}, {
			new: false
		}, {
			new: true
		}]);

	db.overview('mooOverview')
		.query({
			'new': true
		})
		.from('moo')
		.reduce(function () {
			var arr = this.find(),
				item = {
					count: arr.length
				};

			item.className = arr.length > 0 ? 'view' : 'hidden';

			return item;
		})
		.link('#testTarget', {
			template: '<div data-link="class{:className} data-count{:count}">There are {^{:count}} new items to view, click to view.</div>'
		});

	var elems = $('#testTarget div');
	var elem = $(elems[0]);

	ok(elems.length === 1, 'Correct number of elements rendered');
	ok(elem.attr('data-count') === '2', 'DOM data-bound elements are showing correct data');

	base.domDown();
	base.dbDown();
});