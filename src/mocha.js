import 'mocha/mocha';

const { Mocha } = global;

function deleteFromGlobal(key) {
  delete global[key];
  delete window[key];
}

// Clean up the global space. Mocha is so messy.
deleteFromGlobal('Mocha');
deleteFromGlobal('mocha');
deleteFromGlobal('describe');
deleteFromGlobal('xdescribe');
deleteFromGlobal('it');
deleteFromGlobal('xit');
deleteFromGlobal('before');
deleteFromGlobal('after');
deleteFromGlobal('beforeEach');
deleteFromGlobal('afterEach');
deleteFromGlobal('run');

export default Mocha;