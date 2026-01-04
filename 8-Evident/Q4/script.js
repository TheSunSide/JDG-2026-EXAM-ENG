document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inspection-form')
  const countEl = document.getElementById('count')
  const issuesEl = document.getElementById('issues')
  const rateEl = document.getElementById('rate')
  const lastEl = document.getElementById('last')
  const recoList = document.getElementById('reco-list')

  let inspections = []

  form.addEventListener('submit', e => {
    e.preventDefault()
    const id = document.getElementById('inspect-id').value.trim()
    const material = document.getElementById('material').value
    const location = document.getElementById('location').value.trim()
    const notes = document.getElementById('notes').value.trim()
    const hasAnomaly = document.getElementById('has-anomaly').checked
    if (!id || !material || !location) {
      alert('Invalid input(s)...')
      return
    }
    const record = { id, material, location, notes, hasAnomaly, ts: Date.now() }
    inspections.push(record)
    updateMetrics()
    generateRecommendations(record)
    // no persistence by design
    form.reset()
    document.getElementById('has-anomaly').checked = false
  })

  document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('inspection-form').reset()
    document.getElementById('has-anomaly').checked = false
  })

  function updateMetrics() {
    countEl.textContent = inspections.length
    const anomalies = inspections.filter(i => i.hasAnomaly).length
    issuesEl.textContent = anomalies
    rateEl.textContent = inspections.length ? Math.round(((inspections.length - anomalies) / inspections.length) * 100) + '%' : '100%'
    lastEl.textContent = inspections.length ? new Date(inspections[inspections.length - 1].ts).toLocaleString() : '-'
  }

  function generateRecommendations(record) {
    const ul = recoList;
    ul.innerHTML = '';

    if (record.material === 'Steel' && record.notes.length < 10) {
      const li = document.createElement('li');
      li.textContent = 'For steel, add more detailed measurements (more than 10 characters).';
      ul.appendChild(li);
    }
    if (record.hasAnomaly) {
      const li = document.createElement('li');
      li.textContent = 'An anomaly has been detected. Please follow the safety protocol.';
      ul.appendChild(li);
    }

    const extraRecommendations = [
      "Check safety equipment before each inspection.",
      "Consult the maintenance manual regularly.",
      "Schedule annual training for staff.",
      "Make sure tools are calibrated.",
      "Document every anomaly detected.",
      "Clean the inspection area after use.",
      "Keep a record of previous inspections.",
      "Immediately report any potential danger.",
      "Review emergency procedures.",
      "Perform a cross-check with a colleague."
    ];
    const randomRec = extraRecommendations[Math.floor(Math.random() * extraRecommendations.length)];
    const extraLi = document.createElement('li');
    extraLi.textContent = randomRec;
    ul.appendChild(extraLi);
  }

})
