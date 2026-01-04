-- ============================================================================
-- REQUEST_1.sql - Somnia Data
-- ============================================================================
-- Objective: Retrieve the list of users with more than 3 active intervention plans
-- ============================================================================

SELECT u.*
FROM users u
JOIN profiles p ON u.userId = p.userId
JOIN interventionPlans ip ON p.profileId = ip.profileId
GROUP BY u.userId, p.profileId
HAVING COUNT(ip.planId) > 3;