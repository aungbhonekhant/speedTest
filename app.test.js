const speedTest = require('./helper/speedTest');
const speed = new speedTest();

const benchmark = require('./helper/benchmark');
const Benchmark = new benchmark();

const mongoose = require("mongoose");

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

jest.useRealTimers();

describe('speedTest', () => {
    it('isSpeedTest class exist', () => {
        expect(typeof speedTest).toEqual('function');
    })

    it('isPin method exist', () => {
        expect(speed.pin()).toBeDefined();
    })

    it('isDownloadSpeed method exist', () => {
        expect(speed.download_speed()).toBeDefined();
    })

    it('isUploadSpeed method exist', () => {
        expect(speed.upload_speed()).toBeDefined();
    })

    it('isReturn float pin', async () => {
        const pin = await speed.pin();
        expect(isFloat(pin)).toBeTruthy();
    })

    it('isReturn float download_speed', async () => {
        const download = await speed.download_speed();
        expect(isFloat(download)).toBeTruthy();
    })

    it('isReturn float upload_speed', async () => {
        const upload = await speed.upload_speed();
        expect(isFloat(upload)).toBeTruthy();
    })
})

describe('speedTest', () => {
    afterAll(() => {
        mongoose.connection.close()
    })

    it('isBenchmark class exist', () => {
        expect(typeof benchmark).toEqual('function');
    })

    it('isHourly method exist', () => {
        jest.useFakeTimers();
        const hourly = Benchmark.hourly();
        expect(hourly).toBeDefined();
    })

    it('isPin_average method exist',  () => {
        const pin_average =Benchmark.pin_average();
        expect(pin_average).toBeDefined();
    })

    it('isDownload_average method exist',  () => {
        const download_average = Benchmark.download_average();
        expect(download_average).toBeDefined();
    })

    it('isUpload_average method exist',  () => {
        const upload_average = Benchmark.upload_average();
        expect(upload_average).toBeDefined();
    })

    it('isPin method exist',  () => {
        const pin = Benchmark.pin();
        expect(pin).toBeDefined();
    })

    it('isDownload method exist',  () => {
        const download = Benchmark.download();
        expect(download).toBeDefined();
    })

    it('isUpload method exist',  () => {
        const upload = Benchmark.upload();
        expect(upload).toBeDefined();
    })
})
