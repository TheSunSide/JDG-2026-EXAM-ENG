-- ============================================================================
-- REQUEST_2.sql - Somnia Data
-- ============================================================================
-- Objective: Retrieve a list of all the profiles of a given user (user id = 42) with its number of pending 
--            intervention plans.
-- ============================================================================

SELECT p.*, COUNT(CASE WHEN ip.priority = 'pending' THEN 1 END) AS pending_count
FROM users u
JOIN profiles p ON u.userId = p.userId
JOIN interventionPlans ip ON p.profileId = ip.profileId
WHERE u.userId = 42
GROUP BY p.profileId;
