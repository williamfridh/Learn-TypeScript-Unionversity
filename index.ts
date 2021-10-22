import courses from './courses.js';
import studyGroups from './studyGroups.js';



/**
 * Set types & data.
 */
type Course = {
	id: number;
	studyGroupId: number;
	title: string;
	keywords: string[];
	eventType: string;
};
type StudyGroup = {
	id: number;
	courseId: number;
	title: string;
	keywords: string[];
	eventType: string;
};
type SearchEventsOptions = {
	query: string|number;
	eventType: 'courses'|'groups';
};
let enrolledEvents: (Course|StudyGroup)[] = [];



/**
 * Search amongst events using provided data.
 * 
 * @param options SearchEventsOptions
 * @returns a found event
 */
function searchEvents(options: SearchEventsOptions): (Course | StudyGroup)[] {
	const events: (Course|StudyGroup)[] = options.eventType === 'courses' ? courses : studyGroups;

	return events.filter(event => {
		if (typeof options.query === 'number') {
			return event.id === options.query;
		}
		if (typeof options.query === 'string') {
			return event.keywords.includes(options.query);
		}
	});

}



/**
 * Enroll a course or studygroup.
 * 
 * @param events (Course|StudyGroup)[]
 */
function enroll(events: (Course|StudyGroup)[]){
	events.forEach(event => {
		enrolledEvents.push(event);
	});
}



/**
 * Remove a course or studygroup from enrolled ones.
 * 
 * @param id number
 */
function deroll(id: number){
	enrolledEvents = enrolledEvents.filter(event => event.id !== id);
}



/**
 * Print full list of enrolled courses and study groups.
 */
function printList() {
	enrolledEvents.forEach(event => {
		console.log(event.title);
	});
}



/**
 * Execution.
 */
const searchResults = searchEvents({query: 'art', eventType: 'courses'});

//console.log(searchResults); // Used for early testing in the project.

enroll(searchResults);
deroll(1);
printList();

