class Time {
    private totalSeconds: number;

    constructor(totalSeconds: number) {
        this.totalSeconds = totalSeconds;
    }

    private leadingZero(num: number) {
        return num < 10 ? "0" + num : num;
    }

    private getHours() {
        return this.leadingZero(Math.floor((this.totalSeconds / 60 / 60) % 24));
    }

    private getMinutes() {
        return this.leadingZero(Math.floor((this.totalSeconds / 60) % 60));
    }

    private getSeconds() {
        return this.leadingZero(this.totalSeconds % 60);
    }

    getFormatedTime() {
        return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`;
    }
}

export default Time;
