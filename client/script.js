/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready( startApp );

function startApp(){
	/*
	startTests will test your code.  Once it works, 
	delete startTests and uncomment the code below to run YOUR code and test it
	*/

//debugger;
	//intiateTestDisplay();
	//startTests();
	var sgt = null;
	var domElements = {
		studentName: "#studentName",
		studentCourse: "#studentCourse",
		studentGrade: "#studentGrade",
		addButton: "#addButton",
		cancelButton: "#cancelButton",
		studentContainer: ".student-list-container",
		avgGradeContainer: ".avgGrade"
	};
	sgt = new SGT_template(domElements);
	sgt.addEventHandlers();

}




