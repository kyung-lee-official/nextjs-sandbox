export type Foo = {
	a: number;
	b: number;
};

export function fooReducer(state: Foo, action: { type: string; payload: any }) {
	switch (action.type) {
		case "delete":
			return { a: 0, b: 0 };
			break;
		default:
			return state;
			break;
	}
}
