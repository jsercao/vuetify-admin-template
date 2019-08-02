export function successResults(data = {}) {
  return {
    status: true,
    data
  }
}

export function failResults(reason, data = {}) {
  return {
    status: false,
    data,
    reason
  }
}
