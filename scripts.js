const WinningLine = (props) => {
	const slots = props.slots;
	const line = slots.map((slot, idx) => <span key={idx}>{String.fromCodePoint(slot)}</span>);
	const isWinner = slots.every(slot => slot === slots[0]);

	return (
		<div>
			<p>{line}</p>
			<p>{isWinner ? 'You winner!' : 'You loser!'}</p>
		</div>
	);
};

class SlotMachine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			slotLines: []
		};

		this.triggerLever = this.triggerLever.bind(this);
	}

	generateLine() {
		const slots = [128516, 127818, 127812];
		let slotsCount = slots.length;
		let line = [];

		while (slotsCount) {
			slotsCount--;
			line[slotsCount] = this.getRandomSlot(slots);
		}

		return line;
	}

	getRandomSlot(slots) {
		return slots[Math.floor(Math.random() * (slots.length - 1))];
	}

	makeLine() {
		const line = this.generateLine();

		this.setState({
			slotLines: [...this.state.slotLines, line]
		});
	}

	triggerLever(interval) {
		this.reelId = setInterval(() => {
			this.makeLine();
		}, interval)
	}

	componentDidMount() {
		this.triggerLever(5000);
	}

	componentWillUnmount() {
		clearInterval(this.reelId)
	}

	render() {
		const lines = this.state.slotLines.map((line, idx) =>
			<WinningLine key={idx} slots={line} />
		);
		return <div>{lines}</div>;
	}
}

ReactDOM.render(
	<SlotMachine />,
	document.getElementById('root')
);