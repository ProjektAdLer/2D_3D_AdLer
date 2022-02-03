// Hier wird die Moodle API dirket verwendet. Am besten würde man hier noch eine
// Fassade einführen

import { injectable } from 'inversify';

@injectable()
export class Calculator {
	public checkInput = (trueOrFalse: boolean): boolean => {
		return trueOrFalse;
	};
}
